//Student-dokumentin skeema
const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const ReactionSchema = new mongoose.Schema({
  reaction1: {
    type: String,
    require: true,
  },
  reaction2: {
    type: String,
    require: true,
  },
  reaction3: {
    type: String,
    require: true,
  },
  reaction4: {
    type: String,
    require: true,
  },
  reaction5: {
    type: String,
    require: true,
  },
});

//Muistiinpano, tähän varmaan pitää tehä toinen skeema rollille

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const Reaction = mongoose.model('Reaction', ReactionSchema);
// exportataan model
module.exports = Reaction;
