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

  async saveEnc(req, res) {
    try {
      const biomeId = req.params.biomeId;
      const encounterId = req.params.encId;

      console.log('Starting saveEnc with:', { biomeId, encounterId });

      // Validate ObjectIds first
      if (!mongoose.Types.ObjectId.isValid(biomeId) || !mongoose.Types.ObjectId.isValid(encounterId)) {
        console.error('Invalid ObjectId:', { biomeId, encounterId });
        return res.status(400).json({ message: 'Invalid biome ID or encounter ID' });
      }

      // Strip out non-schema fields
      const encounterData = {
        name: req.body.name,
        description: req.body.description,
        weight: req.body.weight,
        roll: req.body.roll || '',
        img: req.body.img || ''
      };

      console.log('Cleaned encounter data:', encounterData);

      try {
        // First, find the biome and the specific encounter
        const biome = await RandomEncounter.findById(biomeId);

        if (!biome) {
          console.error('Biome not found:', biomeId);
          return res.status(404).json({ message: 'Biome not found' });
        }

        // Find the encounter in the enc array
        const encounterIndex = biome.enc.findIndex(
          e => e._id.toString() === encounterId
        );

        if (encounterIndex === -1) {
          console.error('Encounter not found in biome:', { biomeId, encounterId });
          return res.status(404).json({ message: 'Encounter not found in biome' });
        }

        // Update the encounter data while preserving _id
        biome.enc[encounterIndex] = {
          ...encounterData,
          _id: biome.enc[encounterIndex]._id // Preserve the original _id
        };

        // Save the entire biome document
        const savedBiome = await biome.save();

        // Get the updated encounter
        const updatedEncounter = savedBiome.enc[encounterIndex];

        console.log('Successfully updated encounter:', updatedEncounter);
        return res.json(updatedEncounter);

      } catch (error) {
        console.error('Database operation failed:', error);
        return res.status(500).json({
          message: 'Database operation failed',
          error: error.message,
          stack: error.stack
        });
      }
    } catch (error) {
      console.error('Unexpected error in saveEnc:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        stack: error.stack
      });
    }
  },

  addEnc(req, res) {
    console.log('Adding encounter', req.body);

    // Create the new encounter object
    const newEncounter = {
      name: req.body.name,
      description: req.body.description,
      weight: req.body.weight,
      roll: req.body.roll,
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
  addTable(req, res) {
    RandomEncounter.insertMany(req.body)
      .then((docs) => {
        console.log('Random Encounter table inserted successfully:', docs);
      })
      .catch((err) => {
        console.error('Error inserting encounters:', err);
      });
  },
  deleteTable(req, res) {
    const biomeId = req.params.id; // biomeId from URL params
    console.log(`Deleting table with ID: ${biomeId}`);
    RandomEncounter.findOneAndDelete({ _id: biomeId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({ message: 'Table not found' });
        }
        console.log('Random Encounter table deleted successfully:', doc);
        res.json({ message: 'Encounter deleted successfully' });
      })
      .catch((err) => {
        console.error('Error deleting encounters:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  },
};

module.exports = RandomEncounterController;
