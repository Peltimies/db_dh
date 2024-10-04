// UserController on Userin tietokantaoperaatiot sisältävä kontrolleri

const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const createToken = require('../createtoken.js');
const validateSocialToken = require('../validatesocialtoken.js');

const UserController = {
  // uuden käyttäjän rekisteröinti ja tallennus mongo-kantaan
  async registerUser(req, res, next) {
    // passu kryptataan ennen kantaan laittamista
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      isadmin: req.body.isadmin,
    }).catch((error) => {
      return res
        .status(500)
        .send('Käyttäjän rekisteröinti epäonnistui.' + error);
    });
    const token = createToken(user); // tokenin luontimetodi
    // palautetaan token JSON-muodossa
    res.json({
      success: true,
      message: 'Tässä on valmis Token!',
      token: token,
    });
  },

  // Metodi jolla kirjaudutaan sisään olemassa olevalla omalla käyttäjällä
  async authenticateUser(req, res, next) {
    // etsitään käyttäjä kannasta http-pyynnöstä saadun käyttäjätunnuksen perusteella
    const user = await User.findOne({
      username: req.body.username,
    }).catch((error) => {
      throw error;
    });
    if (!user) {
      //jos käyttääjää ei ole kannassa, autentikaatio epäonnistui.
      res.json({
        success: false,
        message: 'Autentikaatio epäonnistui. Syy 1',
      });
    } else if (user) {
      // console.log(req.body.password); // lomakkelle syötetty salasana
      // console.log(user.password); // kannassa oleva salasana
      // verrataan lomakkeelle syötettyä salasanaa kannassa olevaan salasanaan
      // jos vertailtavat eivät ole samat, palautetaan tieto siitä että autentikaatio epäonnistui
      if (bcrypt.compareSync(req.body.password, user.password) === false) {
        res.json({
          success: false,
          message: 'Autentikaatio epäonnistui. Syy 2',
        });
      } else {
        // jos salasanat ovat samat, luodaan token
        const token = createToken(user); // tokenin luontimetodi
        // palautetaan token JSON-muodossa
        res.json({
          success: true,
          message: 'Tässä on valmis Token!',
          token: token,
        });
      }
    }
  },

  /* Metodi jolla kirjaudutaan olemassa olevalla Googlen käyttäjällä
       Käyttäjän idtoken saadaan frontendistä ja se validoidaan Googlen palvelussa.
       Onnistuneen validaation tuloksena saadaan käyttäjädataa, eli userid, joka
       sijoitetaan JWT-tokeniin joka lähetetään frontendiin. Frontendissä JWT:tä
       voidaan käyttää esim. sovelluksessa liikkumiseen ja REST-apin reittien authorisaatioon.
    */
  authenticateGUser: function (req, res, next) {
    // Googlelta frontendissä saatu token
    const token = req.body.gtoken;
    console.log(token);

    // validateSocialToken palauttaa promisen, joka tässä käsitellään then-metodilla
    validateSocialToken(token).then(function (userid) {
      console.log(userid);
      // userid eli käyttäjän yksilöllinen Google-tunnus laitetaan JWT-tokeniin
      const user = { username: userid, isadmin: true };
      const jwttoken = createToken(user); // tokenin luontimetodi
      console.log('Valmis JWT: ' + jwttoken);
      res.json({
        success: true,
        message: 'Tässä on valmis JWT-token!',
        token: jwttoken,
      });
    });
  },
};

module.exports = UserController;
