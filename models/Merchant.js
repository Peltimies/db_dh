const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "Magic", "Blacksmith"
  location: { type: String, required: true },
  items: [
    {
      itemType: {
        type: String,
        enum: ['Weapon', 'Armor', 'Gear', 'Consumable'],
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Merchant', merchantSchema);
