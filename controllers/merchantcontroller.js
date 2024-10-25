// controllers/merchantController.js
const Merchant = require('../models/Merchant');
//const Item = require('../models/Item');

const MerchantController = {
  // 1) Kaikki encounterit
  findAll(req, res) {
    Merchant.find()
      .then((re) => {
        res.json(re);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = MerchantController;
