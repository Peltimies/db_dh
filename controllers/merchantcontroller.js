// controllers/merchantController.js

const { Item, Merchant } = require('../models/Merchant');

//const Item = require('../models/Item');

const MerchantController = {
  // 1) Kaikki encounterit
  getMerchants(req, res) {
    Merchant.find()
      // Tämä populate on TÄRKEÄ!! Ilman sitä getMerchants ei vie inventoryn tietoja mukanaan
      .populate('inventory')
      .then((re) => {
        res.json(re);
      })
      .catch((error) => {
        throw error;
      });
  },
  async createMerchant(req, res) {
    try {
      const { name, type } = req.body;
      console.log('Request body:', req.body);

      // Alustetaan että typesArray on aina taulukko riippumatta siitä, onko type alunperin annettu taulukkona vai yksittäisenä arvona
      // Jos type on taulukkomuodossa esim: ["Armor, "Weapon"], se sijoitetaan suoraan typesArray -muuttujaan. Jos taas type on yksittäinen arvo,
      // se kääritään taulukoksi [type], jotta sen käsittely on helpompaaa
      const merchantType = Array.isArray(type) ? type : [type];

      // Aggregaatilla tarkoitetaan tietojen käsittelyä sekä analysointia kokoelmasta käyttäen "agregointiputkea"
      // Tässä tapauksessa Item kokoelma aggregoituu sample-metodilla, joka valitsee 10 satunnaista riviä
      const randomItems = await Item.aggregate([
        { $match: { type: { $in: merchantType } } },
        { $sample: { size: 10 } },
      ]);

      console.log('Random items selected:', randomItems);

      // Luodaan kauppias uudella satunnaisesti luodulla inventaariolla
      const newMerchant = await Merchant.create({
        name,
        inventory: randomItems.map((item) => item._id),
      });

      console.log('New merchant created:', newMerchant);
      // Käytetään populate-metodia hakeaksemme item -kokoelmasta tietoa ja liittää ne merchants kokoelmaan
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

  // Kauppiaanpoisto metodi, tämä metodi hakee kauppiaan id:n perusteella ja poistaa sen
  deleteMerchant(req, res) {
    // Logataan poistettavan kauppiaan id
    console.log('Deleting merchant with id:', req.params.id);
    // Mongoose metodi findByIdAndDelete = haetaan kauppias id:n perusteella
    Merchant.findByIdAndDelete(req.params.id)
      .then((merchant) => {
        if (!merchant) {
          return res.status(404).json({ message: 'Merchant not found' });
        }
        console.log('Merchant deleted successfully:', merchant);
        res.json({ message: 'Merchant deleted successfully' });
      })
      .catch((err) => {
        console.error('Error deleting merchant:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  },
};

module.exports = MerchantController;
