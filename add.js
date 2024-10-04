require('./dbconnection'); // koko tiedoston importtaus onnistuu

const RandomEncounter = require('./models/RandomEncounter'); // model
//const NewRanomEncounterObject = require('./NewRandomEncounterObject');

// eslint-disable-next-line new-cap
//const newRandomEncounter = RandomEncounter(NewRanomEncounterObject);

// Define your DnD encounters for wilderness encountersconst encounters = [
const randomEncounters = [
  {
    biome: 'Highway',
    img: 'assets/highway.png',
    enc: [
      {
        name: 'Highwaymen',
        description:
          'The party gets waylaid by a group of 2d4 Bandits. They utter: "My men would like a word about your belongings!" as they draw their blades.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Niko',
        description:
          'Niko teleports behind the party and attempts to whip one of the players with an extension cord.',
        weight: 8,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Travelling Merchant',
        description:
          'A lone merchant, heavily laden with goods, is making their way down the highway. They may offer to trade or sell goods to the party.',
        weight: 3,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Group of Pilgrims',
        description:
          'A group of devout pilgrims, traveling to a nearby holy site, are seeking donations or food from the party.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Wanted Poster',
        description:
          'A posted notice on a nearby tree or milestone announces a reward for the capture of a notorious outlaw, who may be hiding in the nearby area. ',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Abandoned Cart',
        description:
          'A rickety cart, abandoned by its owner, contains a few scattered goods and a cryptic note hinting at a local mystery',
        weight: 10,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Mysterious Stranger',
        description:
          'A hooded figure, dressed in dark clothing, is watching the party from a distance.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Roadside Shrine',
        description:
          'A small, old shrine dedicated to a deity stands on the side of the road.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
    ],
  },
  {
    biome: 'Dungeon',
    img: 'assets/dungeon.png',
    enc: [
      {
        name: 'Spider`s web',
        description:
          'A narrow corridor is filled with a thick layer of spider webs. ',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Rival Dungeon Crawlers',
        description:
          'A rival gang of 2d4 Dungeon Crawlers are heard fighting a group of 2d6 Goblins in an adjacent room',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Skeletons',
        description:
          '2d6 Skeletal sentinels are guarding an artifact placed on a pedestal. Their bones creak with a malevolent rattle. ',

        weight: 1,
        img: 'assets/ettercap.png',
      },
    ],
  },
  {
    biome: 'Settlement',
    img: 'assets/settlement.png',
    enc: [
      {
        name: 'Paranoid Guards',
        description:
          'A patrol of stalwart defenders of the realm are convinced that you are hiding something. Probably several somethings. In fact, they accuse the party of being a spy, a thief, a murdered and a pastry thief all rolled into one.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Lost Child',
        description:
          'A young child, no more than 6 years old, is wandering the streets of the settlement, crying and looking for their parents. The child is dirty and hungry, and seems to have been on their own for some time.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Market Scuffle',
        description:
          'A dispute between two merchants has escalated into a physical altercation, with the two men shouting and shoving each other in the middle of the market. The crowd is gathering to watch, and the town guards are struggling to intervene.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Traveling Performer',
        description:
          'A lone musician, juggler, or other performer has arrived in the settlement, seeking to entertain the locals and earn some coin. They may offer to perform for the party, or ask for their help in setting up their act.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Suspicious Stranger',
        description:
          'A hooded figure is lurking around the edges of the settlement, eyeing the party with suspicion. They seem to be trying to keep a low profile, but may be willing to approach the party if they seem friendly.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Town Crier',
        description:
          'The town crier is standing in the center of the settlement, shouting out the latest news and announcements to the gathered crowd. They may have information about local events, rumors, or job opportunities.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Food Cart Fire',
        description:
          'A food cart has caught fire, and the vendor is frantically trying to put out the flames. The party may be able to help, or may need to navigate around the chaos.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Noble Patron',
        description:
          'A wealthy noble or merchant is seeking to hire a group of adventurers for a private task. They may offer a generous reward, but may also have ulterior motives.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
    ],
  },
  {
    biome: 'Wilderness',
    img: 'assets/wilderness.png',
    enc: [
      {
        name: 'Anturai Raiders',
        description:
          'A marauding band of 2d4 Anturai, are tearing through the wilderness with reckless abandon. Their gnarly grunts and piercing shrieks echo through the trees as they hunt for their next victim. The air is thick with the stench of their musky scent, and the ground trembles beneath their feet as they bound through the forest with deadly precision .',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Ettercap',
        description:
          'An Ettercap carefully spins its web between the trees. Its gleaming red eyes glinting with a focused eerie intelligence.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Giant Spiders',
        description:
          'This part of the forest is heavily laden with thick spider webs. Chittering can be heard in distant trees.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Lost Traveler',
        description:
          'A traveler, perhaps a merchant or a wanderer, has become lost in the wilderness. They may be able to provide the party with valuable information, or may need help finding their way back.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Menhir',
        description:
          'A set of standing stones, worn smooth by the elements and covered in moss and lichen, stand sentinel in the wilderness. The stones, each one towering above the others, seem to be arranged in a deliberate pattern, as if they are trying to convey a message to anyone who approaches. The air around the menhir is heavy with an otherworldly energy, and the stones seem to hum with a gentle, pulsing power. As you draw closer, you can feel the weight of centuries of history and ritual emanating from the stones, and you begin to suspect that this is a place of great spiritual significance',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Hunters',
        description: 'A campfire with 1d4 Hunters',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Forest Bandits',
        description:
          '2d4 Forest Bandits leap out of the shadows - Ambushing the party.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Strange Mist',
        description:
          'A strange, sweet-scented mist fills the air, causing the PCs´ eyelids to grow heavy and their thoughts to slow. The world blurs and distorts, and the sound of their own breathing grows loud, as the mist wraps around them like a damp shroud, threatening to drag them down into a deep, dreamless sleep',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Rotted Tree',
        description:
          'A decrepit, ancient tree, its trunk rotten and unstable, suddenly collapses, its massive branches crashing towards the PCs with a deafening roar. The ground shakes and debris flies everywhere as the tree´s trunk hurtles towards them, threatening to crush them beneath its weight.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Trapped adventurer',
        description:
          'An adventurer, their screams echoing through the wilderness, lies on the ground, their ankle trapped in a bear trap. The wound is deep and bloody, and the limb is clearly broken, the bone sticking out through the skin. The adventurer is thrashing about, clearly unable to free themselves without help.',
        weight: 1,
        img: 'assets/ettercap.png',
      },
      {
        name: 'Ancient Anturai',
        description:
          'An ancient great Anturai drags 1d4 injured, tied-up rival adventurers.',
        weight: 1,
        img: 'public/assets/ettercap.png',
      },
    ],
  },
];

// Insert wilderness encounters into the database
RandomEncounter.insertMany(randomEncounters)
  .then((docs) => {
    console.log('Encounters inserted successfully:', docs);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error inserting encounters:', err);
    process.exit(1);
  });

//RandomEncounter.create(newRandomEncounter)
//  .then((doc) => {
//    console.log('Encounter created:', NewRanomEncounterObject);
//    process.exit(0);
//  })
//  .catch((err) => {
//    console.error('Error creating encounter:', err);
//    process.exit(1);
//  });
//
