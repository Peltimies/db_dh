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

  // Poisto Idn perusteella
  deleteById(req, res) {
    console.log('Deleting', req.params.id);
    RandomEncounter.findOneAndDelete({ _id: req.params.id });
    res.json('Encounter deleted');
  },

  // Tallennetaan kohtaamisen muutokset
  async saveEnc(req, res) {
    console.log('Updating encounter for biome:', req.params.biomeId);
    console.log('Encounter ID:', req.params.encId);
    console.log('Request body:', req.body);

    try {
      // Etsii biomen ID;n perusteella
      const biome = await RandomEncounter.findById(req.params.biomeId);
      if (!biome) {
        console.log('Biome not found');
        return res.status(404).json({ error: 'Biome not found' });
      }

      // Etsii kohtaamisen ensin ID;llä
      let encounterIndex = biome.enc.findIndex(
        (e) => e._id.toString() === req.params.encId
      );

      // ...jos sitä ei löydy sitten nimellä
      if (encounterIndex === -1 && req.body.name) {
        encounterIndex = biome.enc.findIndex((e) => e.name === req.body.name);
      }

      if (encounterIndex === -1) {
        console.log('Update failed - encounter not found');
        return res.status(404).json({ error: 'Encounter not found' });
      }

      // Pitää alkuperäisen IDn päivättäessä
      const originalId = biome.enc[encounterIndex]._id;

      // Päivittää kohtaamisen
      biome.enc[encounterIndex] = {
        _id: originalId, // Preserve the original ID
        name: req.body.name,
        description: req.body.description,
        weight: req.body.weight,
        roll: req.body.roll,
        img: req.body.img,
      };

      const savedBiome = await biome.save();
      console.log('Update successful');
      res.json(savedBiome);
    } catch (error) {
      console.error('Error updating encounter:', error);
      res.status(500).json({ error: 'Error updating encounter' });
    }
  },

  // Tämä toiminto lisää encounterin
  addEnc(req, res) {
    console.log('Adding encounter', req.body);

    // Luodaan uusi newEncounter objekti
    const newEncounter = {
      name: req.body.name,
      description: req.body.description,
      weight: req.body.weight,
      roll: req.body.roll,
      img: req.body.img,
    };

    console.log('New encounter object:', newEncounter);

    // Päivitetään RandomEncounter dokumenttia, pushaamalla se enc taulukkoon
    RandomEncounter.findByIdAndUpdate(
      req.params.id, // Mätsätään Encounterin dokumentti biomen ID:llä URLista
      { $push: { enc: newEncounter } }, // Pushataan uusi encounteri newEncounter objektiin
      { new: true } // Tämä palauttaa päivitetyn dokumentin
    )
    // Virheenkäsittely, jos dokumentti on olemassa, console.logataan se
    // Jos ei ole, palautetaan 404 error
      .then((updatedEncounter) => {
        console.log('Updated encounter:', updatedEncounter);
        if (!updatedEncounter) {
          return res.status(404).json({ error: 'Biome not found' });
        }
        res.json(updatedEncounter); // Palautetaan påivitetty dokumentti, jossa on uusi encounter
      })
      .catch((err) => {
        console.error('Error adding encounter:', err);
        res.status(500).json({ error: 'Error adding encounter' });
      });
  },

  // Poistaa encounterin
  deleteEnc(req, res) {
    const biomeId = req.params.biomeId; // Otetaan biome ID URLista
    const encId = req.params.encId; // Otetaan encounter ID URLista
    if (!biomeId || !encId) { // Virheen käsittely, tarkistetaan löytyykö URLista molemmat IDt
      return res
        .status(400)
        .json({ message: 'Biome ID and Encounter ID are required' });
    }

    RandomEncounter.findOneAndUpdate(
      { _id: biomeId }, // Etsitään biome ID:n perusteella
      { $pull: { enc: { _id: encId } } }, // Poistetaan pullilla encountteri biomen enc taulukosta
      { new: true } // Tämä palauttaa päivitetyn dokumentin
    ) // Virheenkäsittely, kaikki hyvin jos dokumentti on olemassa
    // Ei hyvin, jos ei ole :(
      .then((updatedBiome) => {
        if (!updatedBiome) {
          return res
            .status(404)
            .json({ message: 'Biome or Encounter not found' });
        }
        // Vahvistus viesti backendin puolella mikäli onnistuimme
        res.json({ message: 'Encounter deleted', updatedBiome });
      })
      // Virheenkäsittely jne.
      .catch((err) => {
        console.error('Error deleting encounter:', err);
        res.status(500).json({ error: err.message });
      });
  },
  // Biome taulukon lisaäminen
  addTable(req, res) {
    RandomEncounter.insertMany(req.body)
      .then((docs) => {
        console.log('Random Encounter table inserted successfully:', docs);
      })
      .catch((err) => {
        console.error('Error inserting encounters:', err);
      });
  },
  // Biome taulukon poisto
  deleteTable(req, res) {
    const biomeId = req.params.id; // URL parametrit tarjoavat biomen ID:n
    console.log(`Deleting table with ID: ${biomeId}`);
    RandomEncounter.findOneAndDelete({ _id: biomeId }) // Etsitään biome ID:n perusteella ja poistetaan se
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
