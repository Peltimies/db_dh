const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const EntitySchema = new mongoose.Schema({
  entity: {
    type: String,
    require: true,
  },
  roll: {
    type: Number,
    require: true,
    min: 1,
    max: 6,
  },
});

//Muistiinpano, tähän varmaan pitää tehä toinen skeema rollille

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisää skeeman
const Entity = mongoose.model('Entity', EntitySchema);
// exportataan model
module.exports = Entity;
