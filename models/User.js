const mongoose = require('mongoose');

// Mongoose skeema tarjoaa MongoDb:n tiedoille mallin ja validoinnin
// sekä rajoittimia.

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, required: true },
});

// skeemasta pitää tehdä model jonka kautta kantaoperaatioita tehdään
const User = mongoose.model('User', UserSchema);
// exportataan model
module.exports = User;
