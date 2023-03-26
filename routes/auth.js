const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const modelUser = require('../models').User;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Express' });
});

router.post('/',function (req,res) {
  console.log(req.body);
  
})
 

router.post('/signup', function (req, res) {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password
  let passHash = bcrypt.hashSync(password, 10)


  //   try {
    modelUser.create({
        firstName: firstname,
        lastName: lastname,
        email:email,
        password: password,
    }).then(data => {
        res.json({
            user: data
        })
    }).catch(err => {
        res.status(500).json(err)
    })
// } catch (error) {
//     console.log(error);
// }


// res.json({firstname: firstname, lastname: lastname, email: email, password: passHash})
})

module.exports = router;
