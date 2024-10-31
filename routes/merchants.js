/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const merchCon = require('../controllers/merchantcontroller');

router.get('/', merchCon.getMerchants);

//http://localhost:3000/merchants/create
router.post('/create', merchCon.createMerchant);

module.exports = router;
