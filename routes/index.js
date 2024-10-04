/* eslint-disable new-cap */
const express = require('express');
const passport = require('passport');
const router = express.Router();

// reitti home-sivulle jossa näkyy suojattu alue jos autentikaatio on onnistunut
router.get('/', (req, res, next) => {
  // home-sivulle välitetään Googlelle tehdyn pyynnön tuloksena saatu user-olio,
  // joka sisältää käyttäjän Google-profiilitiedot
  console.log(req.user);
  res.render('home', { user: req.user });
});
// autentikaatioreitti
// autentikaation scope on Googlen käyttäjäprofiili, joka saadaan autentikaation tuloksena
router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// logout-reitti vie juureen eli home-sivulle
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
// callback-reitti jonne palataan autentikaation jälkeen
// vie myös juureen eli home-sivulle
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);

module.exports = router;
