const passport = require('passport');
const express = require('express');
const router = express.Router();

const {ensureAuthenticated} = require('../controllers/controllerAuth');

/* GET home page. */
router.get('/', ensureAuthenticated, (req, res, next) => {
  const {username, firstName , lastName}= req.user;
  res.render('dashboard', { title: 'dashboard',username: `${firstName} ${lastName}  ` });
});

module.exports = router;

