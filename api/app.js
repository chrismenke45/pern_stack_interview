var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const pool = require('./db/db')

var nursesRouter = require('./routes/nurses');
const shiftsRouter = require('./routes/shifts')
const specificQueryRouter = require('./routes/specificQuery')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/nurses', nursesRouter);
app.use('/shifts', shiftsRouter)
app.use('/specificQuery', specificQueryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: res.locals.message});
});

module.exports = app;
