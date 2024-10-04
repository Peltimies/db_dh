const mongoose = require('mongoose');

const VillageSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  population: { type: String, required: true },
  founding: { type: String, required: true },
  cultures: [String],
  resource: String,
  description: String,
});

module.exports = VillageSchema;
