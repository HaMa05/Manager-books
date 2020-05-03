const db = require("../db");
module.exports.requireAuth = (req, res, next) => {
  var cookieId = req.cookies.cookieId;
  if(!cookieId) {
    res.redirect('/auth/login');
    return;
  }

  var user = db.get("users").find({id: cookieId}).value();
  if(!user) {
    res.redirect('/auth/login');
    return;
  }
  
  next();
}