const mongoose = require('mongoose');
const EncounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  roll: { type: String, required: false },
  weight: { type: Number, required: true },
  img: { type: String, required: false },
});

module.exports = EncounterSchema;
