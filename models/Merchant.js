const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Armor', 'Weapon', 'Consumable', 'Magic'] },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('Merchant', merchantSchema);

const itemSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
  ware: String,
  type: String,
  cost: Number,
  weight: Number,
  quantity: Number,
  dmg: String,
  rng: Number,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);
const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = { Item, Merchant };
