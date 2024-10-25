require('./dbconnection'); // koko tiedoston importtaus onnistuu

const Merchant = require('./models/Merchant');
//const NewRanomEncounterObject = require('./NewRandomEncounterObject');

// eslint-disable-next-line new-cap
//const newRandomEncounter = RandomEncounter(NewRanomEncounterObject);

// Define your DnD encounters for wilderness encountersconst encounters = [

const merchants = [
  {
    name: 'Elara the Enchantress',
    type: 'Magic',
    location: 'Eldrin Forest',
    items: [
      {
        itemType: 'Weapon',
        quantity: 5,
      },
      {
        itemType: 'Armor',
        quantity: 3,
      },
      {
        itemType: 'Consumable',
        quantity: 10,
      },
    ],
  },
  {
    name: 'Gorath the Blacksmith',
    type: 'Blacksmith',
    location: 'Ironhold',
    items: [
      {
        itemType: 'Weapon',
        quantity: 10,
      },
      {
        itemType: 'Armor',
        quantity: 5,
      },
    ],
  },
];

Merchant.insertMany(merchants)
  .then((docs) => {
    console.log('Merchants inserted successfully:', docs);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error inserting merchants:', err);
    process.exit(1);
  });
