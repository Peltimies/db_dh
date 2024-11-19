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
  enc: { type: [EncounterSchema], required: true },
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
