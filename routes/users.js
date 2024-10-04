const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const userCon = require('../controllers/usercontroller');

// rekisteröityminen eli luodaan uudet tunnarit
// http://localhost:3000/users/register
router.post('/register', userCon.registerUser);
// kirjautuminen eli autentikaatio tunnareilla
router.post('/login', userCon.authenticateUser);
// Kirjautuminen Googlen tunnareilla Angular-lomakkeelta
router.post('/glogin', userCon.authenticateGUser);

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1bmdlb25tYXN0ZXIiLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE3MTgwOTA0ODksImV4cCI6MTcxODE3Njg4OX0.J4OKCtDULLoWjpx_phDgtwoI5JGUTUULYm-xFwGD2pc
