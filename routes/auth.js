const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const modelUser = require('../models').User;
const dashboardRouter = require('../routes/dashboard');


// const passport = require('../config/passport/passport');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auth', { title: 'Express' });
});

// !! ahora nos enfocaremos en el login
// ?? ahora para poder loguearnos debemos hacer una consulta de autenticacion
// ??y eso lo haremos con passport en el archivo controllerauth

//!!

//login
router.post('/login', passport.authenticate('local', { 
  successRedirect: '/dashboard', 
  failureRedirect: '/' }))
//!!
// registro
router.post('/signup',   (req, res, next) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password
  let passHash = bcrypt.hashSync(password, 10)


  // await modelUser.findOne({ where: { email: email } })
  // // captura un error general
  //   .catch(err => next(err))
  //   // captura los datos
  //   .then(data => {
  //     // compara si existe el usaurio
  //     if (data) {
  //       res.redirect('/')
  //     }
  //     // sino existe crear uno
  //     else {
  //       modelUser.create({
  // username:email || firstname,
  // firstName: firstname,
  // lastName: lastname,
  // email: email,
  // password: passHash,
  //       }).then(data => {
  //         return next(data)
  //       })
  //     }
  //   });
  //   res.redirect('/dashboard')
   bcrypt.hash(password, 10, (err, hash) => { 
    modelUser.create({
      username: email || firstname,
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: hash,
    }).then(user => {
      req.login(user, (err) => {
        err ? next(err) :
          res.redirect('/dashboard');
      });
    }).catch(err => res.render('auth', { message: err.message }));
  });

})



router.get('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) { return next(err); }

    res.redirect('/');
  });


});

module.exports = router;

