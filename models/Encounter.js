const mongoose = require('mongoose');
const EncounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true, min: 0, max: 100 },
  roll: { type: String, required: false, default: '' }, // Made optional with default empty string
  img: { type: String },
});

module.exports = EncounterSchema;
