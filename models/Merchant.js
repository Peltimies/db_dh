const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Armor', 'Weapon', 'Consumable', 'Magic'] },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('Merchant', merchantSchema);

const itemSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
  ware: { type: String },
  type: { type: String, required: true },
  cost: { type: Number, required: true },
  weight: { type: Number, required: true },
  quantity: { type: Number, required: true },
  dmg: { type: String, required: false },
  rng: { type: String, required: false },
  ac: { type: String, required: false },
});

const Item = mongoose.model('Item', itemSchema);
const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = { Item, Merchant };
