/* eslint-disable new-cap */

const express = require('express');
const router = express.Router();
const sc = require('../controllers/encountercontroller');
const authorize = require('../verifytoken');

//http://localhost:3000/encounters/
router.get('/', sc.findAll);

//http://localhost:3000//encounters/eid/:id
router.get('/eid/:id', sc.findById);

//http://localhost:3000/encounters/:id
router.delete('/:id', authorize, sc.deleteById);

//http://localhost:3000/encounters/create
router.post('/create', authorize, sc.create);

// 6) Opiskelijan muokkaaminen
// localhost:3000/encounters/666194b3625665c3a12f9e4d
router.put('/:id', sc.updateById);

module.exports = router;
