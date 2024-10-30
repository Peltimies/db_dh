//require('./dbconnection'); // koko tiedoston importtaus onnistuu
//
//const Items = require('./models/Item'); // model
////const NewRanomEncounterObject = require('./NewRandomEncounterObject');
//
//// eslint-disable-next-line new-cap
////const newRandomEncounter = RandomEncounter(NewRanomEncounterObject);
//
//// Define your DnD encounters for wilderness encountersconst encounters = [
//
//const items = [
//  {
//    name: 'Iron Sword',
//    type: 'Weapon',
//    description: 'A sturdy iron sword that deals a decent amount of damage.',
//    weight: 3,
//    value: 15,
//    stats: {
//      damage: '1d8',
//      range: 'melee',
//      properties: ['versatile'],
//    },
//  },
//  {
//    name: 'Healing Potion',
//    type: 'Consumable',
//    description: 'A small vial containing a red liquid that heals the drinker.',
//    weight: 0.5,
//    value: 50,
//    stats: {
//      healing: '2d4+2',
//    },
//  },
//  {
//    name: 'Leather Armor',
//    type: 'Armor',
//    description:
//      'Lightweight armor made from leather, offering basic protection.',
//    weight: 10,
//    value: 10,
//    stats: {
//      armor_class: 11,
//      dexterity_bonus: true,
//      stealth_disadvantage: false,
//    },
//  },
//  {
//    name: 'Torch',
//    type: 'Gear',
//    description: 'A wooden torch that illuminates a 20-foot radius when lit.',
//    weight: 1,
//    value: 0.1,
//    stats: {
//      duration: '1 hour',
//      light_radius: '20 feet',
//    },
//  },
//];
//
//Items.insertMany(items)
//  .then((docs) => {
//    console.log('Items inserted successfully:', docs);
//    process.exit(0);
//  })
//  .catch((err) => {
//    console.error('Error inserting items:', err);
//    process.exit(1);
//  });
//
