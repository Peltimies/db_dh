require('./dbconnection'); // koko tiedoston importtaus onnistuu

const RandomEncounter = require('./models/RandomEncounter'); // model

//eslint-disable-next-line new-cap
//const newRandomEncounter = RandomEncounter(NewRanomEncounterObject);

// Check if a biome with the same name already exists
RandomEncounter.findOne({ biome: NewRandomEncounterObject.biome })
  .then((existingBiome) => {
    if (existingBiome) {
      console.error('Biome already exists:', NewRandomEncounterObject.biome);
      process.exit(1); // Exit the process or handle it as needed
    } else {
      // Proceed to create the new biome
      RandomEncounter.create(NewRandomEncounterObject)
        .then((doc) => {
          console.log('Encounter created:', doc);
          process.exit(0);
        })
        .catch((err) => {
          console.error('Error creating encounter:', err);
          process.exit(1);
        });
    }
  })
  .catch((err) => {
    console.error('Error checking for existing biome:', err);
    process.exit(1);
  });
