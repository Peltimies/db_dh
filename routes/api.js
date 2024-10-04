/*
localhost:3000/api/ -reitit. Otettu pois käytöstä koska sovelluksessa
ei ole REST-apia. Mutta jos olisi, tehtäisiin tämän mallin mukaan. Suojatun reitin
authorisaatio tehdään tokenilla joka saadaan Angular-frontendistä
*/
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const apiCon = require('../controllers/apiController'); // api-reittien kontrolleri
const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token
router.get('/', apiCon.findItems);
//tämä reitti käytössä vain authorisoiduille käyttäjille
router.post('/', authorize, apiCon.postItem);

module.exports = router;
