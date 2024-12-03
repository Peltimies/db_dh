/*
app.js on express-sovelluksen päätiedosto josta sovellus lähtee käyntiin
*/
const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
// otetaan käyttöön CORS
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./dbconnection');

const randomEncounterRouter = require('./routes/randomEncounters');
const user = require('./routes/users');
const merchants = require('./routes/merchants');
const app = express();

const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Määritellään frontendin osoite
// Siihen saadaan yhteys corsin ansiosta
// backendi ei voi olla kenenkään muun kaveri kuin tässä määritetyn osoitteen
const corsOptions = {
  origin: [
    'http://dunkku.eu-north-1.elasticbeanstalk.com',
    'http://localhost:4200',
    'https://kit.fontawesome.com/a076d05399.js',
  ],
  optionsSuccessStatus: 200,
};

// corsin käyttöönotto
app.use(cors(corsOptions));



/************** Middlewarejen käyttöönotto *****************/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/tc-dungeonhelper/browser' )));

app.use('/user', user); // users-reitti
app.use('/randomEncounters', randomEncounterRouter);
app.use('/merchants', merchants);
app.use(express.json());
app.use(
  session({
    secret: 'salausarvo',
    cookie: {
      maxAge: 600000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const { body, validationResult } = require('express-validator');
app.use([
  // Example validation middleware for a specific route
  body('email').isEmail(), // Validate email in the request body
  body('password').isLength({ min: 5 }), // Validate password length
]);
// Example error handling for validation errors
app.post('/submit', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // Proceed with the request if validation passes
  // ...
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Kuunnellaan porttia, kun kaikki on määritetty
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'dist/tc-dungeonhelper/browser', 'index.html')
  );
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
