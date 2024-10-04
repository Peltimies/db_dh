const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error: ' + err);
  });
