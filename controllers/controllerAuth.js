 const controller = {} 
  
  //funcion que retorna si no existe una autenticación
  controller.ensureAuthenticated =(req, res, next) =>{
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };

  module.exports = controller;