const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


/* const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); */ // como me he cargado los dos ficheros de routes estas las quito 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS
/* const apiRouter = require('./routes/api');  -- ya no meto esto, lo requiero directamente */
app.use('/api', require('./routes/api'));

/* app.use('/', indexRouter);
app.use('/users', usersRouter); */// como me he cargado los dos ficheros de routes estas las quito 

module.exports = app;
