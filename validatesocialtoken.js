/*
Tokenin validointi google-auth-library -kirjaston avulla. Toiminta esitelty
osoitteessa: https://developers.google.com/identity/sign-in/web/backend-auth
Tässä siis validoidaan frontendistä saatu Googlen token eli varmistetaan että
oikea käyttäjä pääsee käyttämään backendiä.
*/
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Googlen clientId haetaan .env-filusta

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

/* Frontendistä saadun Googlen idTokenin validointi Googlen palvelussa
   ES2017:ssa esitelty async-funktio tekee tästä paljon mukavamman
   näköisen verrattuna siihen jos olisi tehty callbackilla
*/
async function validateSocialToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  console.log(payload['email']);// emailia voisi käyttää tunnisteena tokenissa
  const userid = payload['sub'];// mutta userid on turvallisempi
  console.log('Saatiin userid: ' + userid);
  return userid; // userid palautetaan promisena
}

module.exports = validateSocialToken;
