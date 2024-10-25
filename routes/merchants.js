/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const merchCon = require('../controllers/merchantcontroller');

router.get('/', merchCon.findAll);

//router.post('/', merchCon.createMerchant);

module.exports = router;
