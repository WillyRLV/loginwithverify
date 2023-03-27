
const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local');



module.exports = function (db) {


  passport.use(new LocalStrategy((username, password, done) => {
console.log(`el usuario ${username} intenta acceder`)
    db.findOne({ where: { username: username } }).then(user => {
      if (!user) return done(null,false)
      if(!bcrypt.compareSync(password, user.password))
     {return done(null,false)}
    
      return done(null,user)

    });
  }));


    passport.serializeUser(async (user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    db.findByPk(id)
    .then( user => done(null, user))
  
  })
   

 



//  db.findOne({ where:{email:'williamlv_98_2@hotmail.com'} }).then(dae =>{
//   dae ? console.log(dae): console.log("talahueva");
//  }).catch(err => console.log(err));

//  db.findByPk(3).then(dae =>{
//   dae ? console.log(dae): console.log("talahueva");
//  }).catch(err => console.log(err));

//  db.findOne({where:{email:'williamlv_98_2@hotmail.com'}}).then(dae =>{
//   dae ? console.log(dae): console.log("talahueva");
//  }).catch(err => console.log(err));

}


