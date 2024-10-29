// controllers/merchantController.js
const Merchant = require('../models/Merchant');
const Item = require('../models/Item');
//const Item = require('../models/Item');

const MerchantController = {
  // 1) Kaikki encounterit
  getMerchants(req, res) {
    Merchant.find()
      .then((re) => {
        res.json(re);
      })
      .catch((error) => {
        throw error;
      });
  },

  async createMerchant(req, res) {
    try {
      const merchant = await Merchant.create(req.body);
      await populateMerchantInventory(merchant); // Populate inventory
      res.status(201).json(merchant);
    } catch (error) {
      console.error('Error creating merchant:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

// Function to populate merchant inventory
const populateMerchantInventory = (merchant) => {
  return Item.find({ type: merchant.type }).then((items) => {
    const randomItems = items
      .sort(() => 0.5 - Math.random()) // Shuffle items
      .slice(0, 5); // Limit to 5 items

    const inventory = randomItems.map((item) => ({
      name: item.name,
      type: item.type,
      description: item.description,
      weight: item.weight,
      value: item.value,
      quantity: Math.floor(Math.random() * 5) + 1, // Random quantity 1-5
      stats: item.stats, // Copy full stats object
    }));

    // Update the merchant's inventory with detailed item data
    return Merchant.findOneAndUpdate(
      { _id: merchant._id },
      { $set: { inventory } },
      { new: true }
    );
  });
};

module.exports = MerchantController;
