/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const itemCon = require('../controllers/itemcontroller');

router.get('/', itemCon.findAll);

module.exports = router;
