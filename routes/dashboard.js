const passport = require('passport');
const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../controllers/controllerAuth');

/* GET home page. */
router.get('/', ensureAuthenticated, (req, res, next) => {
  const { username, firstName, lastName, email, photo, lastSession } = req.user;
  const context = {
    title: 'dashboard',
    username: `${firstName} ${lastName}  `,
    email: email,
    lastSession: lastSession,
    photo: photo,
  }
  res.render('dashboard',  context );
});

module.exports = router;

