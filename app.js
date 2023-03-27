const createError = require('http-errors');
const modelUser = require('./models').User;
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportconfig = require('./config/passport/passport');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const engine = require('ejs-mate');
const loginRouter = require('./routes/auth.js');
const dashboardRouter = require('./routes/dashboard');



// importar modelos

// var aboutRouter = require('./routes/about');
// var portafolioRouter = require('./routes/portafolio');
// var contactRouter = require('./routes/contact');
// var usersRouter = require('./routes/users');



var app = express();
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  key: 'express.sid',
}));


// inicializamos
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use('/', loginRouter) ;
//ruta del dashboard
app.use('/dashboard', dashboardRouter);
passportconfig(modelUser)


// app.use('/dashboard', dashboardRouter);

// app.use('/about', aboutRouter);
// app.use('/portafolio', portafolioRouter);
// app.use('/contact', contactRouter);


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
