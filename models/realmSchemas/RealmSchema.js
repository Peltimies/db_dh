const mongoose = require('mongoose');
const RegionSchema = require('./RegionSchema');

const RealmSchema = new mongoose.Schema({
  regions: {
    type: Map,
    of: RegionSchema,
  },
});

const Realm = mongoose.model('Realm', RealmSchema);

module.exports = Realm;
