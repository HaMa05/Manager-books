const db = require("../db");
module.exports.requireAuth = (req, res, next) => {
  var cookieId = req.signedCookies.cookieId;
  if(!cookieId) {
    res.redirect('/auth/login');
    return;
  }

  var user = db.get("users").find({id: cookieId}).value();
  if(!user) {
    res.redirect('/auth/login');
    return;
  }
  
  // nếu là user thì chỉ hiển thị trang transaction
  if(!user.isAdmin) {
    res.redirect('/transactions');
    return;
  }
  
  next();
}