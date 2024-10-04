require('./dbconnection'); // koko tiedoston importtaus onnistuu

const RandomEncounter = require('./models/RandomEncounter'); // model
const NewRanomEncounterObject = require('./NewRandomEncounterObject');
//eslint-disable-next-line new-cap
const newRandomEncounter = RandomEncounter(NewRanomEncounterObject);

RandomEncounter.findOneAndUpdate(newRandomEncounter)
  .then((doc) => {
    console.log('Encounter created:', NewRanomEncounterObject);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error creating encounter:', err);
    process.exit(1);
  });
