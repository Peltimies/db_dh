/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const authorize = require('../verifytoken');
const reactionCon = require('../controllers/reactioncontroller');

// http://localhost:3000/reactions
router.get('/', reactionCon.findAll);
// http://localhost:3000/reactions/:id
router.get('/reactions/:id', reactionCon.findById);
// http://localhost:3000/reactions/create
router.post('/create', authorize, reactionCon.create);
// http://localhost:3000/reactions/:id
router.put('/:id', authorize, reactionCon.updateById);
// http://localhost:3000/reactions/:id
router.delete('/:id', authorize, reactionCon.deleteById);

module.exports = router;
