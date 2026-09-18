import { Song, Artist, Comment } from '../types';

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'isaac-watts',
    name: 'Isaac Watts & Robert Lowry',
    photo: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    bannerPhoto: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    monthlyListeners: 'Zion Classics',
    bio: 'Renowned as the father of English hymnody. Composed hundreds of sacred songs of Zion, expressing the joy of the pilgrimage to the holy mountain.',
    origin: 'Southampton, United Kingdom',
    genres: ['Hymns', 'Zion Songs', 'Choral'],
    popularSongIds: ['marching-to-zion', 'joy-to-the-world'],
    albums: [
      { id: 'zion-pilgrims', title: 'Songs of Mount Zion', year: 1707, cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', trackCount: 14 }
    ]
  },
  {
    id: 'john-newton',
    name: 'John Newton',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    bannerPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    monthlyListeners: 'Olney Hymns',
    bio: 'English poet and clergyman who penned timeless hymns celebrating God’s sovereign grace, salvation, and the glorious beauty of Zion.',
    origin: 'London, United Kingdom',
    genres: ['Zion Hymns', 'Grace', 'Choral'],
    popularSongIds: ['glorious-things-of-thee', 'amazing-grace-chains'],
    albums: [
      { id: 'olney-hymns', title: 'Olney Hymns', year: 1779, cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', trackCount: 12 }
    ]
  },
  {
    id: 'matt-redman',
    name: 'Matt Redman',
    photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    bannerPhoto: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
    monthlyListeners: 'Worship Collective',
    bio: 'Grammy Award-winning British Christian worship leader and songwriter whose songs of praise resonate in congregations across the globe.',
    origin: 'Watford, Hertfordshire, UK',
    genres: ['Contemporary Praise', 'Acoustic Worship', 'Psalms'],
    popularSongIds: ['10000-reasons', 'heart-of-worship'],
    albums: [
      { id: '10000-reasons-album', title: '10,000 Reasons', year: 2011, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', trackCount: 11 }
    ]
  },
  {
    id: 'sinach',
    name: 'Sinach',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bannerPhoto: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1400&q=80',
    monthlyListeners: 'Global Praise',
    bio: 'Internationally acclaimed gospel singer and songwriter whose anthems of faith and deliverance have topped charts in over 50 nations.',
    origin: 'Ebonyi State, Nigeria',
    genres: ['Gospel', 'Praise & Worship', 'Anthems'],
    popularSongIds: ['way-maker', 'i-know-who-i-am'],
    albums: [
      { id: 'way-maker-album', title: 'Way Maker (Live)', year: 2016, cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80', trackCount: 18 }
    ]
  },
  {
    id: 'hillsong-worship',
    name: 'Hillsong Worship',
    photo: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=600&q=80',
    bannerPhoto: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    monthlyListeners: 'Worldwide Praise',
    bio: 'Pioneering worship collective uniting congregations worldwide in heartfelt adoration and scripture-steeped anthems.',
    origin: 'Sydney, Australia',
    genres: ['Modern Worship', 'Anthems', 'Psalms'],
    popularSongIds: ['what-a-beautiful-name', 'mighty-to-save'],
    albums: [
      { id: 'let-there-be-light', title: 'Let There Be Light', year: 2016, cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80', trackCount: 17 }
    ]
  },
  {
    id: 'bethel-music',
    name: 'Bethel Music & Jenn Johnson',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    bannerPhoto: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=80',
    monthlyListeners: 'Worship Community',
    bio: 'Worship movement dedicated to leading hearts into the presence of God with transparent devotion, testimony, and spiritual anthems.',
    origin: 'Redding, California, USA',
    genres: ['Worship', 'Acoustic', 'Devotional'],
    popularSongIds: ['goodness-of-god'],
    albums: [
      { id: 'victory-album', title: 'Victory', year: 2019, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80', trackCount: 14 }
    ]
  }
];

export const INITIAL_SONGS: Song[] = [
  {
    id: 'marching-to-zion',
    title: "We're Marching to Zion",
    artist: 'Isaac Watts & Robert Lowry',
    artistId: 'isaac-watts',
    album: 'Songs of Zion',
    albumArt: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    releaseYear: 1707,
    duration: '3:45',
    durationSeconds: 225,
    genre: 'Zion Songs',
    language: 'English',
    mood: 'Energetic',
    trendingRank: 1,
    trendPercentage: '+42%',
    playsCount: 'Zion Hymn #1',
    keySignature: 'G Major',
    tempoBpm: 104,
    writers: ['Isaac Watts (1707)', 'Robert Lowry (Refrain 1867)'],
    producers: ['Traditional Zion Hymnal'],
    isVerified: true,
    verifiedBy: 'Zion Music Archives & Sacred Hymnology Committee',
    studioNote: 'Rooted in Isaiah 35:10 and Hebrews 12:22.',
    aboutSong: '“We’re Marching to Zion” (originally titled “Heavenly Joy on Earth”) is one of the definitive songs of Zion. Isaac Watts composed it to remind believers that the journey of faith is marked by triumphant joy and fellowship as we journey toward the city of the living God.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'Come, we that love the Lord,',
          'And let our joys be known;',
          'Join in a song with sweet accord,',
          'Join in a song with sweet accord,',
          'And thus surround the throne,',
          'And thus surround the throne.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          "We're marching to Zion,",
          'Beautiful, beautiful Zion;',
          "We're marching upward to Zion,",
          'The beautiful city of God.'
        ],
        timestamp: 42
      },
      {
        type: 'Verse 2',
        lines: [
          'Let those refuse to sing',
          'Who never knew our God;',
          'But children of the heav’nly King,',
          'But children of the heav’nly King,',
          'May speak their joys abroad,',
          'May speak their joys abroad.'
        ],
        timestamp: 75
      },
      {
        type: 'Chorus',
        lines: [
          "We're marching to Zion,",
          'Beautiful, beautiful Zion;',
          "We're marching upward to Zion,",
          'The beautiful city of God.'
        ],
        timestamp: 115
      },
      {
        type: 'Verse 3',
        lines: [
          'The hill of Zion yields',
          'A thousand sacred sweets',
          'Before we reach the heav’nly fields,',
          'Before we reach the heav’nly fields,',
          'Or walk the golden streets,',
          'Or walk the golden streets.'
        ],
        timestamp: 145
      },
      {
        type: 'Outro',
        lines: [
          'Then let our songs abound,',
          'And every tear be dry;',
          "We're marching through Emmanuel’s ground,",
          'To fairer worlds on high.'
        ],
        timestamp: 185
      }
    ]
  },
  {
    id: 'glorious-things-of-thee',
    title: 'Glorious Things of Thee Are Spoken (Zion, City of Our God)',
    artist: 'John Newton',
    artistId: 'john-newton',
    album: 'Olney Hymns',
    albumArt: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    releaseYear: 1779,
    duration: '4:12',
    durationSeconds: 252,
    genre: 'Zion Songs',
    language: 'English',
    mood: 'Focus',
    trendingRank: 2,
    trendPercentage: '+35%',
    playsCount: 'Zion Hymn #2',
    keySignature: 'F Major',
    tempoBpm: 92,
    writers: ['John Newton'],
    producers: ['Sacred Music Heritage'],
    isVerified: true,
    verifiedBy: 'Olney Archives & Zion Hymn Society',
    studioNote: 'Inspired by Psalm 87:3 and Isaiah 33:20-21.',
    aboutSong: 'Penned by John Newton (the author of Amazing Grace), this majestic Zion hymn portrays the unshakeable foundation and living water provided to the citizens of God’s heavenly city.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'Glorious things of thee are spoken,',
          'Zion, city of our God;',
          'He whose word cannot be broken',
          'Formed thee for His own abode.',
          'On the Rock of Ages founded,',
          'What can shake thy sure repose?',
          'With salvation’s walls surrounded,',
          'Thou may’st smile at all thy foes.'
        ],
        timestamp: 0
      },
      {
        type: 'Verse 2',
        lines: [
          'See, the streams of living waters,',
          'Springing from eternal love,',
          'Well supply thy sons and daughters,',
          'And all fear of want remove.',
          'Who can faint while such a river',
          'Ever will their thirst assuage?',
          'Grace, which like the Lord, the Giver,',
          'Never fails from age to age.'
        ],
        timestamp: 60
      },
      {
        type: 'Verse 3',
        lines: [
          'Round each habitation hov’ring,',
          'See the cloud and fire appear',
          'For a glory and a cov’ring,',
          'Showing that the Lord is near!',
          'Glorious things of thee are spoken,',
          'Zion, city of our God!'
        ],
        timestamp: 130
      },
      {
        type: 'Outro',
        lines: [
          'Savior, if of Zion’s city,',
          'I through grace a member am,',
          'Let the world deride or pity,',
          'I will glory in Thy name.'
        ],
        timestamp: 195
      }
    ]
  },
  {
    id: '10000-reasons',
    title: '10,000 Reasons (Bless the Lord)',
    artist: 'Matt Redman',
    artistId: 'matt-redman',
    album: '10,000 Reasons',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2011,
    duration: '5:42',
    durationSeconds: 342,
    genre: 'Praise & Worship',
    language: 'English',
    mood: 'Chill',
    trendingRank: 3,
    trendPercentage: '+28%',
    playsCount: '2.1B',
    keySignature: 'G Major',
    tempoBpm: 73,
    writers: ['Matt Redman', 'Jonas Myrin'],
    producers: ['Nathan Nockels'],
    isVerified: true,
    verifiedBy: 'Integrity Music & Zion Praise Standards',
    studioNote: 'Directly grounded in Psalm 103:1-5.',
    aboutSong: '“10,000 Reasons” is an intimate, acoustic psalm written in a 16th-century chapel in West Sussex. It expresses eternal praise to God for His unfailing kindness, regardless of life’s circumstance.',
    lyrics: [
      {
        type: 'Chorus',
        lines: [
          'Bless the Lord, O my soul, O my soul,',
          'Worship His holy name.',
          'Sing like never before, O my soul,',
          "I'll worship Your holy name."
        ],
        timestamp: 0
      },
      {
        type: 'Verse 1',
        lines: [
          'The sun comes up, it’s a new day dawning;',
          'It’s time to sing Your song again.',
          'Whatever may pass, and whatever lies before me,',
          'Let me be singing when the evening comes.'
        ],
        timestamp: 35
      },
      {
        type: 'Chorus',
        lines: [
          'Bless the Lord, O my soul, O my soul,',
          'Worship His holy name.',
          'Sing like never before, O my soul,',
          "I'll worship Your holy name."
        ],
        timestamp: 75
      },
      {
        type: 'Verse 2',
        lines: [
          'You’re rich in love, and You’re slow to anger.',
          'Your name is great, and Your heart is kind.',
          'For all Your goodness, I will keep on singing;',
          'Ten thousand reasons for my heart to find.'
        ],
        timestamp: 110
      },
      {
        type: 'Verse 3',
        lines: [
          'And on that day when my strength is failing,',
          'The end draws near, and my time has come;',
          'Still my soul will sing Your praise unending:',
          'Ten thousand years and then forevermore!'
        ],
        timestamp: 180
      },
      {
        type: 'Outro',
        lines: [
          'Bless the Lord, O my soul,',
          'Worship His holy name.',
          "Yes, I'll worship Your holy name."
        ],
        timestamp: 250
      }
    ]
  },
  {
    id: 'way-maker',
    title: 'Way Maker',
    artist: 'Sinach',
    artistId: 'sinach',
    album: 'Way Maker (Live)',
    albumArt: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2015,
    duration: '5:08',
    durationSeconds: 308,
    genre: 'Praise & Worship',
    language: 'English',
    mood: 'Energetic',
    trendingRank: 4,
    trendPercentage: '+31%',
    playsCount: '1.8B',
    keySignature: 'E Major',
    tempoBpm: 68,
    writers: ['Osinachi Kalu Okoro Egbu (Sinach)'],
    producers: ['Sinach Music'],
    isVerified: true,
    verifiedBy: 'Loveworld & Global Zion Song Collective',
    studioNote: 'Reflecting Isaiah 43:16-19 and Exodus 14.',
    aboutSong: 'Written by Nigerian gospel minister Sinach, “Way Maker” became a global anthem sung in dozens of languages across the world, proclaiming God as the light in darkness and miracle worker.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'You are here, moving in our midst;',
          'I worship You, I worship You.',
          'You are here, working in this place;',
          'I worship You, I worship You.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          'You are Way Maker, Miracle Worker,',
          'Promise Keeper, Light in the darkness,',
          'My God, that is who You are.',
          'Way Maker, Miracle Worker,',
          'Promise Keeper, Light in the darkness,',
          'My God, that is who You are.'
        ],
        timestamp: 48
      },
      {
        type: 'Verse 2',
        lines: [
          'You are here, touching every heart;',
          'I worship You, I worship You.',
          'You are here, healing every life;',
          'I worship You, I worship You.',
          'You are here, turning lives around;',
          'I worship You, I worship You.'
        ],
        timestamp: 110
      },
      {
        type: 'Bridge',
        lines: [
          'Even when I don’t see it, You’re working,',
          'Even when I don’t feel it, You’re working,',
          'You never stop, You never stop working,',
          'You never stop, You never stop working.'
        ],
        timestamp: 175
      },
      {
        type: 'Outro',
        lines: [
          'That is who You are,',
          'That is who You are,',
          'My God, that is who You are.'
        ],
        timestamp: 240
      }
    ]
  },
  {
    id: 'how-great-thou-art',
    title: 'How Great Thou Art',
    artist: 'Stuart K. Hine (Carl Boberg)',
    artistId: 'isaac-watts',
    album: 'Sacred Anthems',
    albumArt: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    releaseYear: 1949,
    duration: '4:30',
    durationSeconds: 270,
    genre: 'Hymns',
    language: 'English',
    mood: 'Focus',
    trendingRank: 5,
    trendPercentage: '+22%',
    playsCount: 'Zion Classic',
    keySignature: 'Bb Major',
    tempoBpm: 76,
    writers: ['Carl Boberg (1885)', 'Stuart K. Hine (1949)'],
    producers: ['Zion Hymnal Masters'],
    isVerified: true,
    verifiedBy: 'Hymn Society & Zion Editorial Board',
    studioNote: 'Based on Psalm 8:1 and Psalm 145:3.',
    aboutSong: 'Originating from a poem inspired by a sudden summer thunderstorm in southeastern Sweden, this hymn expresses breathless reverence for God’s glorious creation and redemption.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'O Lord my God, when I in awesome wonder,',
          'Consider all the worlds Thy hands have made;',
          'I see the stars, I hear the rolling thunder,',
          'Thy power throughout the universe displayed.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          'Then sings my soul, my Saviour God, to Thee,',
          'How great Thou art! How great Thou art!',
          'Then sings my soul, my Saviour God, to Thee,',
          'How great Thou art! How great Thou art!'
        ],
        timestamp: 45
      },
      {
        type: 'Verse 2',
        lines: [
          'When through the woods and forest glades I wander,',
          'And hear the birds sing sweetly in the trees;',
          'When I look down from lofty mountain grandeur,',
          'And hear the brook and feel the gentle breeze.'
        ],
        timestamp: 88
      },
      {
        type: 'Verse 3',
        lines: [
          'And when I think, that God, His Son not sparing;',
          'Sent Him to die, I scarce can take it in;',
          'That on the cross, my burden gladly bearing,',
          'He bled and died to take away my sin.'
        ],
        timestamp: 140
      },
      {
        type: 'Chorus',
        lines: [
          'Then sings my soul, my Saviour God, to Thee,',
          'How great Thou art! How great Thou art!',
          'Then sings my soul, my Saviour God, to Thee,',
          'How great Thou art! How great Thou art!'
        ],
        timestamp: 185
      }
    ]
  },
  {
    id: 'amazing-grace-chains',
    title: 'Amazing Grace (My Chains Are Gone)',
    artist: 'John Newton & Chris Tomlin',
    artistId: 'john-newton',
    album: 'See the Morning',
    albumArt: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2006,
    duration: '4:26',
    durationSeconds: 266,
    genre: 'Hymns',
    language: 'English',
    mood: 'Chill',
    trendingRank: 6,
    trendPercentage: '+19%',
    playsCount: '950M+',
    keySignature: 'E Major',
    tempoBpm: 64,
    writers: ['John Newton', 'Chris Tomlin', 'Louie Giglio'],
    producers: ['Ed Cash'],
    isVerified: true,
    verifiedBy: 'Sixstepsrecords & Zion Hymn Archive',
    studioNote: 'Anchored in Ephesians 2:8-9 and John 8:36.',
    aboutSong: 'A celebrated modern adaptation of John Newton’s 1779 hymn, incorporating the unforgettable liberation chorus: “My chains are gone, I’ve been set free.”',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'Amazing grace, how sweet the sound,',
          'That saved a wretch like me!',
          'I once was lost, but now am found;',
          'Was blind, but now I see.'
        ],
        timestamp: 0
      },
      {
        type: 'Verse 2',
        lines: [
          "'Twas grace that taught my heart to fear,",
          'And grace my fears relieved;',
          'How precious did that grace appear',
          'The hour I first believed.'
        ],
        timestamp: 40
      },
      {
        type: 'Chorus',
        lines: [
          'My chains are gone, I’ve been set free,',
          'My God, my Savior has ransomed me.',
          'And like a flood His mercy reigns,',
          'Unending love, amazing grace.'
        ],
        timestamp: 75
      },
      {
        type: 'Verse 3',
        lines: [
          'The Lord has promised good to me,',
          'His Word my hope secures;',
          'He will my shield and portion be,',
          'As long as life endures.'
        ],
        timestamp: 120
      },
      {
        type: 'Outro',
        lines: [
          'The earth shall soon dissolve like snow,',
          'The sun forbear to shine;',
          'But God, who called me here below,',
          'Will be forever mine.'
        ],
        timestamp: 180
      }
    ]
  },
  {
    id: 'goodness-of-god',
    title: 'Goodness of God',
    artist: 'Bethel Music & Jenn Johnson',
    artistId: 'bethel-music',
    album: 'Victory',
    albumArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2019,
    duration: '4:56',
    durationSeconds: 296,
    genre: 'Praise & Worship',
    language: 'English',
    mood: 'Chill',
    trendingRank: 7,
    trendPercentage: '+38%',
    playsCount: '1.2B',
    keySignature: 'Ab Major',
    tempoBpm: 68,
    writers: ['Jenn Johnson', 'Ed Cash', 'Jason Ingram', 'Ben Fielding', 'Brian Johnson'],
    producers: ['Ed Cash'],
    isVerified: true,
    verifiedBy: 'Bethel Music Studio Standards',
    studioNote: 'Rooted in Psalm 23:6 and Psalm 145:7.',
    aboutSong: 'Written by Jenn Johnson while driving down a quiet country road, this tender acoustic testimony recounts God’s steadfast, relentless faithfulness in every season of life.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'I love You, Lord, for Your mercy never fails me;',
          'All my days, I’ve been held in Your hands.',
          'From the moment that I wake up until I lay my head,',
          'Oh, I will sing of the goodness of God.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          'And all my life You have been faithful,',
          'And all my life You have been so, so good;',
          'With every breath that I am able,',
          'Oh, I will sing of the goodness of God.'
        ],
        timestamp: 45
      },
      {
        type: 'Verse 2',
        lines: [
          'I love Your voice, You have led me through the fire;',
          'In darkest night, You are close like no other.',
          'I’ve known You as a Father, I’ve known You as a Friend,',
          'And I have lived in the goodness of God.'
        ],
        timestamp: 95
      },
      {
        type: 'Bridge',
        lines: [
          'Your goodness is running after, it’s running after me;',
          'Your goodness is running after, it’s running after me!',
          'With my life laid down, I’m surrendered now, I give You everything;',
          'Your goodness is running after, it’s running after me.'
        ],
        timestamp: 160
      },
      {
        type: 'Outro',
        lines: [
          'Oh, I will sing of the goodness of God.',
          'All my life You have been faithful.'
        ],
        timestamp: 230
      }
    ]
  },
  {
    id: 'what-a-beautiful-name',
    title: 'What a Beautiful Name',
    artist: 'Hillsong Worship',
    artistId: 'hillsong-worship',
    album: 'Let There Be Light',
    albumArt: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2016,
    duration: '5:41',
    durationSeconds: 341,
    genre: 'Praise & Worship',
    language: 'English',
    mood: 'Focus',
    trendingRank: 8,
    trendPercentage: '+24%',
    playsCount: '1.5B',
    keySignature: 'D Major',
    tempoBpm: 68,
    writers: ['Brooke Ligertwood', 'Ben Fielding'],
    producers: ['Michael Guy Chislett'],
    isVerified: true,
    verifiedBy: 'Hillsong & Zion Liturgical Society',
    studioNote: 'Centered on Philippians 2:9-11 and Hebrews 1:1-4.',
    aboutSong: 'A worship masterwork exploring the majesty, salvation, and transcendent resurrection power contained in the holy Name of Jesus.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'You were the Word at the beginning,',
          'One with God the Lord Most High;',
          'Your hidden glory in creation,',
          'Now revealed in You our Christ.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          'What a beautiful Name it is,',
          'What a beautiful Name it is,',
          'The Name of Jesus Christ my King.',
          'What a beautiful Name it is,',
          'Nothing compares to this,',
          'What a beautiful Name it is, the Name of Jesus.'
        ],
        timestamp: 42
      },
      {
        type: 'Verse 2',
        lines: [
          'You didn’t want heaven without us,',
          'So Jesus, You brought heaven down;',
          'My sin was great, Your love was greater,',
          'What could separate us now?'
        ],
        timestamp: 88
      },
      {
        type: 'Bridge',
        lines: [
          'Death could not hold You, the veil tore before You;',
          'You silence the boast of sin and grave.',
          'The heavens are roaring the praise of Your glory,',
          'For You are raised to life again!',
          'You have no rival, You have no equal,',
          'Now and forever, God, You reign!'
        ],
        timestamp: 165
      },
      {
        type: 'Outro',
        lines: [
          'What a powerful Name it is,',
          'The Name of Jesus Christ my King.'
        ],
        timestamp: 250
      }
    ]
  },
  {
    id: 'zions-hill',
    title: "Zion's Hill",
    artist: 'James A. Crutchfield',
    artistId: 'isaac-watts',
    album: 'Mountain Faith Heritage',
    albumArt: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    releaseYear: 1918,
    duration: '3:50',
    durationSeconds: 230,
    genre: 'Zion Songs',
    language: 'English',
    mood: 'Chill',
    trendingRank: 9,
    trendPercentage: '+20%',
    playsCount: 'Zion Hymn #9',
    keySignature: 'Ab Major',
    tempoBpm: 80,
    writers: ['James A. Crutchfield'],
    producers: ['Southern Gospel & Zion Archive'],
    isVerified: true,
    verifiedBy: 'Zion Hymnody & Heritage Society',
    studioNote: 'Reflecting Revelation 21 and Isaiah 51:11.',
    aboutSong: 'An uplifting traditional gospel hymn of Zion that comforts pilgrims with the promise of eternal peace and glad reunion upon Zion’s sacred hill.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'There waits for me a glad tomorrow,',
          'Where gates of pearl and a golden street;',
          'And I’ll be free from care and sorrow,',
          'When all the saints of all ages meet.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          "I'm climbing up on Zion's hill,",
          'For there is joy, peace and love;',
          'My soul is filled with peace until,',
          'I reach that home prepared above.'
        ],
        timestamp: 45
      },
      {
        type: 'Verse 2',
        lines: [
          'Someday beyond the reach of time,',
          'No clouds will hide the sun again;',
          'We’ll sing the song of love sublime,',
          'Untouched by sorrow, tears or pain.'
        ],
        timestamp: 90
      },
      {
        type: 'Chorus',
        lines: [
          "I'm climbing up on Zion's hill,",
          'For there is joy, peace and love;',
          'My soul is filled with peace until,',
          'I reach that home prepared above.'
        ],
        timestamp: 135
      }
    ]
  },
  {
    id: 'in-christ-alone',
    title: 'In Christ Alone',
    artist: 'Keith Getty & Stuart Townend',
    artistId: 'isaac-watts',
    album: 'Modern Hymns',
    albumArt: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2001,
    duration: '4:15',
    durationSeconds: 255,
    genre: 'Hymns',
    language: 'English',
    mood: 'Focus',
    trendingRank: 10,
    trendPercentage: '+27%',
    playsCount: '780M+',
    keySignature: 'D Major',
    tempoBpm: 62,
    writers: ['Keith Getty', 'Stuart Townend'],
    producers: ['Kingsway Music'],
    isVerified: true,
    verifiedBy: 'Getty Music Standards',
    studioNote: 'Based on 1 Corinthians 15 and Romans 8:38-39.',
    aboutSong: 'Composed on the back of a northern Irish hymn sheet, this modern theological hymn proclaims Christ as the cornerstone and eternal refuge of the believer.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'In Christ alone my hope is found;',
          'He is my light, my strength, my song;',
          'This cornerstone, this solid ground,',
          'Firm through the fiercest drought and storm.',
          'What heights of love, what depths of peace,',
          'When fears are stilled, when strivings cease!',
          'My comforter, my all in all—',
          'Here in the love of Christ I stand.'
        ],
        timestamp: 0
      },
      {
        type: 'Verse 2',
        lines: [
          'There in the ground His body lay,',
          'Light of the world by darkness slain;',
          'Then bursting forth in glorious day,',
          'Up from the grave He rose again!',
          'And as He stands in victory,',
          'Sin’s curse has lost its grip on me;',
          'For I am His and He is mine—',
          'Bought with the precious blood of Christ.'
        ],
        timestamp: 65
      },
      {
        type: 'Verse 3',
        lines: [
          'No guilt in life, no fear in death—',
          'This is the power of Christ in me;',
          'From life’s first cry to final breath,',
          'Jesus commands my destiny.',
          'No power of hell, no scheme of man,',
          'Can ever pluck me from His hand;',
          'Till He returns or calls me home—',
          'Here in the power of Christ I’ll stand.'
        ],
        timestamp: 135
      }
    ]
  },
  {
    id: 'great-is-thy-faithfulness',
    title: 'Great Is Thy Faithfulness',
    artist: 'Thomas Chisholm & William Runyan',
    artistId: 'isaac-watts',
    album: 'Hymns of Faith',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    releaseYear: 1923,
    duration: '4:05',
    durationSeconds: 245,
    genre: 'Hymns',
    language: 'English',
    mood: 'Chill',
    trendingRank: 11,
    trendPercentage: '+15%',
    playsCount: 'Zion Classic',
    keySignature: 'Eb Major',
    tempoBpm: 66,
    writers: ['Thomas O. Chisholm (1923)', 'William M. Runyan'],
    producers: ['Hope Publishing'],
    isVerified: true,
    verifiedBy: 'Zion Hymnology Society',
    studioNote: 'Taken from Lamentations 3:22-23.',
    aboutSong: 'Written by Thomas Chisholm after reflecting on how God provided for his needs through decades of modest living and ordinary days.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'Great is Thy faithfulness, O God my Father,',
          'There is no shadow of turning with Thee;',
          'Thou changest not, Thy compassions, they fail not;',
          'As Thou hast been Thou forever wilt be.'
        ],
        timestamp: 0
      },
      {
        type: 'Chorus',
        lines: [
          'Great is Thy faithfulness! Great is Thy faithfulness!',
          'Morning by morning new mercies I see;',
          'All I have needed Thy hand hath provided—',
          'Great is Thy faithfulness, Lord, unto me!'
        ],
        timestamp: 42
      },
      {
        type: 'Verse 2',
        lines: [
          'Pardon for sin and a peace that endureth,',
          'Thine own dear presence to cheer and to guide;',
          'Strength for today and bright hope for tomorrow,',
          'Blessings all mine, with ten thousand beside!'
        ],
        timestamp: 85
      },
      {
        type: 'Chorus',
        lines: [
          'Great is Thy faithfulness! Great is Thy faithfulness!',
          'Morning by morning new mercies I see;',
          'All I have needed Thy hand hath provided—',
          'Great is Thy faithfulness, Lord, unto me!'
        ],
        timestamp: 130
      }
    ]
  },
  {
    id: 'holy-holy-holy',
    title: 'Holy, Holy, Holy! Lord God Almighty',
    artist: 'Reginald Heber',
    artistId: 'isaac-watts',
    album: 'Sacred Hymnal',
    albumArt: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    releaseYear: 1826,
    duration: '3:30',
    durationSeconds: 210,
    genre: 'Zion Songs',
    language: 'English',
    mood: 'Focus',
    trendingRank: 12,
    trendPercentage: '+18%',
    playsCount: 'Zion Hymn #12',
    keySignature: 'E Major',
    tempoBpm: 88,
    writers: ['Reginald Heber', 'John Bacchus Dykes (Nicaea)'],
    producers: ['Zion Hymnal Masters'],
    isVerified: true,
    verifiedBy: 'Trinity Archive & Zion Liturgical Society',
    studioNote: 'Rooted in Revelation 4:8 and Isaiah 6:3.',
    aboutSong: 'Widely considered one of the finest hymns ever composed in the English language, praising the Triune God whose holiness fills all the earth and heaven.',
    lyrics: [
      {
        type: 'Verse 1',
        lines: [
          'Holy, holy, holy! Lord God Almighty!',
          'Early in the morning our song shall rise to Thee;',
          'Holy, holy, holy, merciful and mighty!',
          'God in three Persons, blessed Trinity!'
        ],
        timestamp: 0
      },
      {
        type: 'Verse 2',
        lines: [
          'Holy, holy, holy! All the saints adore Thee,',
          'Casting down their golden crowns around the glassy sea;',
          'Cherubim and seraphim falling down before Thee,',
          'Which wert, and art, and evermore shalt be.'
        ],
        timestamp: 45
      },
      {
        type: 'Verse 3',
        lines: [
          'Holy, holy, holy! Lord God Almighty!',
          'All Thy works shall praise Thy Name, in earth, and sky, and sea;',
          'Holy, holy, holy; merciful and mighty!',
          'God in three Persons, blessed Trinity!'
        ],
        timestamp: 95
      }
    ]
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    songId: 'marching-to-zion',
    userId: 'u-worship-1',
    userName: 'David Grace',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: '“We’re marching upward to Zion, the beautiful city of God.” Such an inspiring reminder of our eternal hope and joy in Him.',
    timestamp: 'Yesterday',
    likes: 48
  },
  {
    id: 'c-2',
    songId: 'glorious-things-of-thee',
    userId: 'u-worship-2',
    userName: 'Hannah S.',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    content: '“On the Rock of Ages founded, what can shake thy sure repose?” True peace in Zion.',
    timestamp: '2 days ago',
    likes: 36
  },
  {
    id: 'c-3',
    songId: '10000-reasons',
    userId: 'u-worship-3',
    userName: 'Elijah M.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Singing this every morning lifts the spirit. Ten thousand reasons to bless His holy name.',
    timestamp: '3 days ago',
    likes: 54
  }
];

export const LANGUAGES_LIST: string[] = [
  'English',
  'Latin',
  'Hebrew',
  'Spanish',
  'French',
  'German'
];

export const GENRES_LIST: string[] = [
  'Zion Songs',
  'Hymns',
  'Praise & Worship',
  'Choral',
  'Devotional',
  'Acoustic Worship'
];

