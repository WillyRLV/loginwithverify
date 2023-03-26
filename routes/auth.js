const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const modelUser = require('../models').User;
var dashboardRouter = require('../routes/dashboard');





router.use('/dashboard', dashboardRouter);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auth', { title: 'Express' });
});

router.post('/signin', function (req, res) {
  console.log(req.body);

})

// registro
router.post('/signup', async function (req, res, next) {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password
  let passHash = bcrypt.hashSync(password, 10)

  try {

    await modelUser.findOne({ where: { email: email } })
      .catch(err => next(err))
      .then(data => {

        if (data) {
          // res.json({ status: 'no puedes crear con este email' })
          res.redirect('/')

        }
        else {
          modelUser.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: passHash,
          }).then(data => {
            // res.json({
            //   user: data
            // })
            res.redirect('/dashboard')
            // res.redirect('/dashboard')
          }).catch(err => {
            res.status(500).redirect('/')
          })

        }

      })
  } catch (error) {
    console.log(error)
  }

})

module.exports = router;
