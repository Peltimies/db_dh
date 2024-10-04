const mongoose = require('mongoose');

const FortSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  landmarks: [String],
  population: { type: String, required: true },
  founding: { type: String, required: true },
  cultures: [String],
  resource: String,
  description: String,
});

module.exports = FortSchema;
