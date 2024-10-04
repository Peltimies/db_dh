require('./dbconnection'); // koko tiedoston importtaus onnistuu

const RandomEncounter = require('./models/RandomEncounter'); // model
const { id } = require('./NewRandomEncounterObject');

const newName = 'Bandits';
const oldName = 'Highwaymen';

RandomEncounter.findOneAndUpdate(
  // eslint-disable-next-line quote-props
  { id: id, 'enc.name': oldName },
  { 'enc.$.name': newName }
)
  .then((doc) => {
    console.log('Encounter updated:', newName);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error creating encounter:', err);
    process.exit(1);
  });
