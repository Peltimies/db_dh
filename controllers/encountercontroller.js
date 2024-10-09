/* eslint-disable quote-props */
/* eslint-disable new-cap */
/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const RandomEncounter = require('../models/RandomEncounter');
const mongoose = require('mongoose');

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const RandomEncounterController = {
  // 1) Kaikki encounterit
  findAll(req, res) {
    RandomEncounter.find()
      .then((re) => {
        res.json(re);
      })
      .catch((error) => {
        throw error;
      });
  },
  // 2) Yhden biomen haku id:n perusteella
  // findById(req, res) {
  //   //Mongoose-kantaoperaatio tänne
  //   //findOne-metodin argumenttina on olio, jossa on hakuehto
  //   //kannassa olevan id:n (_id) on vastattava pyynnön mukana tulevaan id
  //   RandomEncounter.findOne({ _id: _id })
  //     // palautuva promise sisältää yhden opiskelijan
  //     .then((encounters) => {
  //       res.json(encounters);
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // },

  findById(req, res) {
    const { biomeId } = req.params;

    // Check if biomeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(biomeId)) {
      return res.status(400).json({ error: 'Invalid biome ID' });
    }

    RandomEncounter.findOne({ _id: biomeId })
      .then((encounter) => {
        if (!encounter) {
          return res.status(404).json({ error: 'Encounter not found' });
        }
        res.json(encounter);
      })
      .catch((error) => {
        console.error('Error finding encounter:', error);
        res
          .status(500)
          .json({ error: 'Error finding encounter', message: error.message });
      });
  },

  findByBiome(req, res) {
    RandomEncounter.findOne({ biome: req.params.biome }).then((encounters) => {
      res.json(encounters);
    });
  },

  findByEncounterName(req, res) {
    RandomEncounter.findOne({
      biome: req.params.biome,
      'enc.name': req.params.name,
    }).then((encounters) => {
      res.json(encounters);
    });
  },

  deleteById(req, res) {
    console.log('Deleting', req.params.id);
    RandomEncounter.findOneAndDelete({ _id: req.params.id });
    res.json('Encounter deleted');
  },

  saveEnc: async (req, res) => {
    try {
      const { biomeId, encId } = req.params;
      const { name, description, weight, img } = req.body;

      // Find the document by biomeId
      const encounterDoc = await RandomEncounter.findById(biomeId);
      if (!encounterDoc) {
        return res.status(404).json({ message: 'Biome not found' });
      }

      // Find the encounter by encId within the enc array
      const encounter = encounterDoc.enc.id(encId);
      if (!encounter) {
        return res.status(404).json({ message: 'Encounter not found' });
      }

      // Update encounter fields
      encounter.name = name || encounter.name;
      encounter.description = description || encounter.description;
      encounter.weight = weight || encounter.weight;
      encounter.img = img || encounter.img;

      // Save the updated document
      await encounterDoc.save();

      return res
        .status(200)
        .json({ message: 'Encounter updated successfully', encounter });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  addEnc(req, res) {
    console.log('Adding encounter', req.body);

    // Create the new encounter object
    const newEncounter = {
      name: req.body.name,
      description: req.body.description,
      weight: req.body.weight,
      img: req.body.img,
    };

    console.log('New encounter object:', newEncounter);

    // Update the RandomEncounter document by pushing to the enc array
    RandomEncounter.findByIdAndUpdate(
      req.params.id, // Match the RandomEncounter document by biome's ID from the URL
      { $push: { enc: newEncounter } }, // Push the new encounter to the enc array
      { new: true } // Return the updated document
    )
      .then((updatedEncounter) => {
        console.log('Updated encounter:', updatedEncounter);
        if (!updatedEncounter) {
          return res.status(404).json({ error: 'Biome not found' });
        }
        res.json(updatedEncounter); // Return the updated document with the new encounter
      })
      .catch((err) => {
        console.error('Error adding encounter:', err);
        res.status(500).json({ error: 'Error adding encounter' });
      });
  },

  deleteEnc(req, res) {
    const biomeId = req.params.biomeId; // Get biome ID from URL
    const encId = req.params.encId; // Get encounter ID from URL

    if (!biomeId || !encId) {
      return res
        .status(400)
        .json({ message: 'Biome ID and Encounter ID are required' });
    }

    RandomEncounter.findOneAndUpdate(
      { _id: biomeId }, // Find the biome by its ID
      { $pull: { enc: { _id: encId } } }, // Remove the encounter from the biome's "enc" array
      { new: true } // Return the updated document
    )
      .then((updatedBiome) => {
        if (!updatedBiome) {
          return res
            .status(404)
            .json({ message: 'Biome or Encounter not found' });
        }
        res.json({ message: 'Encounter deleted', updatedBiome });
      })
      .catch((err) => {
        console.error('Error deleting encounter:', err);
        res.status(500).json({ error: err.message });
      });
  },
};

module.exports = RandomEncounterController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:

router.get('/', StudentController.findAll);

jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
