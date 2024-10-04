const mongoose = require('mongoose');
const CitySchema = require('./CitySchema');
const FortSchema = require('./FortSchema');
const TownSchema = require('./TownSchema');
const VillageSchema = require('./VillageSchema');

const RegionSchema = new mongoose.Schema({
  cities: [CitySchema],
  forts: [FortSchema],
  towns: [TownSchema],
  villages: [VillageSchema],
});

module.exports = RegionSchema;
