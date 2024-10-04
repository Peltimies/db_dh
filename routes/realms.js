/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const realmsCon = require('../controllers/realmcontroller');

router.get('/', realmsCon.findAll);

router.get('/:id', realmsCon.findByName);

router.delete('/:id', realmsCon.deleteById);

module.exports = router;
