/* eslint-disable new-cap */

const express = require('express');
const router = express.Router();
const rec = require('../controllers/encountercontroller');
//const authorize = require('../verifytoken');

// 1) Kaikkien random encounterien haku
//http://localhost:3000/randomEncounters/
router.get('/', rec.findAll);

// 2) Random Encounterin haku biomen id;n perusteella
//localhost:3000/randomEncounters/67002a55a7930735f6bac744 (wilderness)
router.get('/:biomeId', rec.findById);

// 3) Biomen haku nimen perusteella
//localhost:3000/randomEncounters/biome/Highway
router.get('/biome/:biome', rec.findByBiome);

// 4) Biomen poisto id;n perusteella
//localhost:3000/randomEncounters/67002a55a7930735f6bac72e/deleteEnc/67002a55a7930735f6bac72f
router.delete('/:biomeId/deleteEnc/:encId', rec.deleteEnc);

// 5) Random Encounterin nimen muokkaaminen
//localhost:3000/randomEncounters/updatename/:biome/:name
router.put('/updateEncName/:biome/:name', rec.updateEncName);

// 6) Random Encounterin kuvauksen muokkaaminen
//localhost:3000/randomEncounters/updatename/:biome/:description
router.put('/updateEncDesc/:biome/:description', rec.updateEncDesc);

// 7) Random Encounterin painoarvon muokkaaminen
//localhost:3000/randomEncounters/updatename/:biome/:weight
router.put('/updateEncWeight/:biome/:weight', rec.updateEncWeight);

// 8) Random Encounterin kuvan muokkaaminen
//localhost:3000/randomEncounters/updateimage/:biome/:image
router.put('/updateEncImg/:biome/:image', rec.updateEncImg);

// 9) Random Encounterin lisääminen
//localhost:3000/randomEncounters/addEnc
router.put('/:id/addEnc', rec.addEnc);

// 10) Random Encounterin poisto
//localhost:3000/randomEncounters/deleteEnc
router.put('/:id/deleteEnc', rec.deleteEnc);

// 11) Random Encounterin muokkaaminen
//localhost:3000/randomEncounters/saveEnc
// localhost:3000/randomEncounters/67002a55a7930735f6bac737/saveEnc/67002a55a7930735f6bac73a
router.put('/saveEnc/:biomeId/:name', rec.saveEnc);

module.exports = router;
