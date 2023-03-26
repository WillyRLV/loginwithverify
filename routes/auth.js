const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const modelUser = require('../models').User;
var dashboardRouter = require('../routes/dashboard');





router.use('/dashboard', dashboardRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Express' });
});

router.post('/signin',function (req,res) {
  console.log(req.body);
  
})
 

router.post('/signup', function (req, res) {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password
  let passHash = bcrypt.hashSync(password, 10)

    modelUser.findOne({
        firstName: firstname,
        lastName: lastname,
        email:email,
        password: passHash,
    }).then(data => {
        // res.json({
        //     user: data
        // })
        res.redirect('/dashboard')
    }).catch(err => {
        res.status(500).redirect('/')
    })


// res.json({firstname: firstname, lastname: lastname, email: email, password: passHash})
})

module.exports = router;
