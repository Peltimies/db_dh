/* eslint-disable quote-props */
require('./dbconnection'); // koko tiedoston importtaus onnistuu

const RandomEncounter = require('./models/RandomEncounter'); // model

RandomEncounter.findOneAndUpdate(
  { _id: id, 'enc._id': encId }, // Match the document and the specific enc object
  {
    $set: {
      'enc.$': updatedEnc, // Use the $ operator to target the matched subdocument
    },
  },
  { new: true }
)
  .then((encounters) => {
    console.log(`Encounter ${encId} in RandomEncounter ${id} updated`);
    res.json(encounters);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Error updating encounter' });
  });
