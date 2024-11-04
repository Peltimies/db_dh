const mongoose = require('mongoose');
const EncounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  description2: { type: String },
  roll: { type: String },
  weight: { type: Number, required: true },
  img: { type: String },
});

module.exports = EncounterSchema;
