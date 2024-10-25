const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['Weapon', 'Armor', 'Gear', 'Consumable'],
    required: true,
  },
  description: String,
  weight: Number,
  value: Number,
  stats: {
    damage: String,
    range: String,
    properties: [String],
    armor_class: Number,
    dexterity_bonus: Boolean,
    stealth_disadvantage: Boolean,
    healing: String,
    duration: String,
    light_radius: String,
  },
});

module.exports = mongoose.model('Item', itemSchema);
