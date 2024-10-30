// controllers/merchantController.js
const { Item, Merchant } = require('../models/Merchant');

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
      console.log('Request body:', req.body);

      // Aggregaatilla tarkoitetaan tietojen käsittelyä sekä analysointia kokoelmasta käyttäen "agregointiputkea"
      // Tässä tapauksessa Item kokoelma aggregoituu sample-metodilla, joka valitsee 5 satunnaista riviä
      const randomItems = await Item.aggregate([{ $sample: { size: 5 } }]);

      console.log('Random items selected:', randomItems);

      // Luodaan kauppias uudella satunnaisesti luodulla inventaariolla
      const newMerchant = await Merchant.create({
        name: req.body.name,
        inventory: randomItems.map((item) => item._id),
      });

      console.log('New merchant created:', newMerchant);
      // Käytetään populate-metodia hakeaksemme item kokoelmasta tietoa ja liittää ne merchants kokoelmaan
      const populatedMerchant = await Merchant.findById(
        newMerchant._id
      ).populate('inventory');

      console.log('Populated merchant:', populatedMerchant);

      res.status(201).json(populatedMerchant);
    } catch (error) {
      res.status(500).json({
        error: 'Error creating merchant',
      });
    }
  },
};

module.exports = MerchantController;
