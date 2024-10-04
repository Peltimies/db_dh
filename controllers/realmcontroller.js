/* eslint-disable new-cap */
const Realm = require('../models/realmSchemas/RealmSchema');

const RealmController = {
  findAll(req, res) {
    Realm.find()
      .then((realms) => {
        res.json(realms);
      })
      .catch((error) => {
        throw error;
      });
  },

  findByName(req, res) {
    Realm.find({ _id: req.params.id })
      .then((realm) => res.json(realm))
      .catch((error) => {
        throw error;
      });
  },

  create(req, res) {
    const newRealm = Realm(req.body);
    Realm.create(newRealm)
      .then((realm) => {
        res.json(realm);
      })
      .catch((error) => {
        throw error;
      });
  },

  updateById(req, res) {
    Realm.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((realm) => {
        console.log(`Realm ${req.params.id} updated`);
        res.json(realm);
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteById(req, res) {
    Realm.findOneAndDelete({ _id: req.params.id })
      .then((realm) => {
        console.log(`Realm ${req.params.id} deleted`);
        res.json(realm);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = RealmController;
