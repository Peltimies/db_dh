/* eslint-disable new-cap */
require('./dbconnection');
const { biome } = require('./NewRandomEncounterObject');

const RandomEncounter = require('./models/RandomEncounter'); // model

//eslint-disable-next-line new-cap

// deleteOnen arjumentit: olio joka kertoo kohteen
RandomEncounter.deleteOne({ biome: 'Wilderness' })
  .then((result) => {
    if (result.deletedCount === 1) {
      // Check if document was deleted
      console.log('Document deleted successfully:', biome);
      process.exit(0);
    } else {
      console.log('No document found with the provided biome:', biome);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
