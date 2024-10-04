const mongoose = require('mongoose');
const EncounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true },
  img: { type: String },
});

module.exports = EncounterSchema;
