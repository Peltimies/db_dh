//Student-dokumentin skeema
const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const EncounterSchema = require('./Encounter');
const RandomEncounterSchema = new mongoose.Schema({
  biome: {
    type: String,
    required: true,
    unique: true,
  },
  img: { type: String, required: false },
  enc: {
    type: [EncounterSchema],
    required: true,
    validate: {
      validator: function(v) {
        return v != null; // Allow empty array but not null
      },
      message: (props) => `${props.value} is not a valid encounters array`
    }
  },
});

//Muistiinpano, tähän varmaan pitää tehä toinen skeema rollille

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const RandomEncounter = mongoose.model(
  'RandomEncounter',
  RandomEncounterSchema
);
// exportataan model
module.exports = RandomEncounter;
