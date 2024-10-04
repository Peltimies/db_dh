/* eslint-disable new-cap */
const Reaction = require('../models/Reactions');

const ReactionController = {
  findAll(req, res) {
    Reaction.find()
      .then((reactions) => {
        res.json(reactions);
      })
      .catch((error) => {
        throw error;
      });
  },

  findById(req, res) {
    Reaction.findById(req.params.id)
      .then((reactions) => {
        res.json(reactions);
      })
      .catch((error) => {
        throw error;
      });
  },

  create(req, res) {
    console.log('Creating new reaction roll table');
    console.log('Request body: ', req.body);
    const newReaction = Reaction(req.body);
    Reaction.create(newReaction)
      .then((reactions) => {
        console.log('Reaction created');
        res.json(reactions);
      })
      .catch((error) => {
        throw error;
      });
  },

  updateById(req, res) {
    Reaction.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((reactions) => {
        console.log(`Reaction ${req.params.id} updated`);
        res.json(reactions);
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteById(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.id })
      .then((reactions) => {
        console.log(`Reaction ${req.params.id} deleted`);
        res.json(reactions);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = ReactionController;
