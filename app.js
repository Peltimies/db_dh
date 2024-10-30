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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Määritellään frontendin osoite
// Siihen saadaan yhteys corsin ansiosta
// backendi ei voi olla kenenkään muun kaveri kuin tässä määritetyn osoitteen
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

// corsin käyttöönotto
app.use(cors(corsOptions));

/**************Miidlewaren käyttöönottoa *****************/
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
app.use(express.static(path.join(__dirname, 'public')));

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

// catch 404 and forward to error handler
//app.use(function (req, res, next) {
// const err = new Error('Not Found');
//err.status = 404;
//next(err);
//});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
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

module.exports = app;
