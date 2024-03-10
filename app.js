require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// CORS Policy
const cors = require("cors");


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user')
const seatRouter = require('./routes/seat')
const roomRouter = require('./routes/room')
const floorRouter = require('./routes/floor')

var app = express();

const PORT = process.env.PORT || 3000;


// App initialization
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Router
app.use('/', indexRouter);
app.use('/user',userRouter)
app.use('/seat',seatRouter)
app.use('/room',roomRouter)
app.use('/floor',floorRouter)

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

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
  res.render('error');
});

module.exports = app;
