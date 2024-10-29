const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "Magic", "Blacksmith"
  location: { type: String, required: true },
  inventory: [
    {
      name: { type: String, required: true },
      type: {
        type: String,
        enum: ['Weapon', 'Armor', 'Gear', 'Consumable', 'Magic'],
        required: true,
      },
      description: String,
      weight: Number,
      value: Number,
      quantity: { type: Number, required: true },
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
    },
  ],
});

module.exports = mongoose.model('Merchant', merchantSchema);
