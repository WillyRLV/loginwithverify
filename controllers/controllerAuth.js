const modeloUser = require('./models').User;
const passport = require('passport');
const LocalStrategy = require('passport-localconst')
const bcrypt = require('bcrypt')
module.exports = function (app, myDataBase) {

