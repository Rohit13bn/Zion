/**
 * Web Audio API synthesizer for playing smooth musical audio previews
 * Supports real tempo, chord progressions, volume control, and playback tracking.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private currentStep: number = 0;
  private volume: number = 0.7;
  private songId: string | null = null;
  private masterGain: GainNode | null = null;

  // Harmonic chord definitions (frequencies in Hz)
  private readonly chordPresets: Record<string, number[][]> = {
    // Pop major: C - G - Am - F
    major: [
      [261.63, 329.63, 392.00, 523.25], // C
      [196.00, 246.94, 293.66, 392.00], // G
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 220.00, 261.63, 349.23], // F
    ],
    // Minor ballad: Am - F - C - G
    minor: [
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 220.00, 261.63, 349.23], // F
      [261.63, 329.63, 392.00, 523.25], // C
      [196.00, 246.94, 293.66, 392.00], // G
    ],
    // Uplifting R&B / Soul: Dm7 - G7 - Cmaj7 - Am7
    soul: [
      [293.66, 349.23, 440.00, 523.25],
      [196.00, 246.94, 349.23, 392.00],
      [261.63, 329.63, 392.00, 493.88],
      [220.00, 261.63, 329.63, 392.00],
    ]
  };

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(songId: string, tempoBpm: number = 90, keySignature: string = 'C Major') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.isPlaying = true;
    this.songId = songId;

    const isMinor = keySignature.toLowerCase().includes('minor') || songId === 'blinding-lights' || songId === 'hukum';
    const isSoul = keySignature.toLowerCase().includes('soul') || songId === 'until-i-found-you';
    const chords = isMinor ? this.chordPresets.minor : isSoul ? this.chordPresets.soul : this.chordPresets.major;

    const beatInterval = (60 / tempoBpm) * 1000;
    this.currentStep = 0;

    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const chord = chords[this.currentStep % chords.length];
      const now = this.ctx.currentTime;

      // Arpeggiate harmonic notes gently
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        // Soft attack & warm decaying envelope
        noteGain.gain.setValueAtTime(0.001, now + idx * 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.09, now + idx * 0.08 + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + (beatInterval / 1000) * 1.5);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + (beatInterval / 1000) * 1.5);
      });

      this.currentStep++;
    };

    playChordStep();
    this.intervalId = window.setInterval(playChordStep, beatInterval);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentSongId(): string | null {
    return this.songId;
  }
}

export const audioSynth = new AudioSynthesizer();
