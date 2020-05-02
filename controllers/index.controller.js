const db = require("../db");
var cookie =  db.get('countCookie').value();
module.exports.index = (req, res, next) => {
  res.render("home.pug");
};

module.exports.createCookie = (req, res, next) => {
  if (!req.cookies.IdCookie) {
    cookie.count = 0;
    db.get('countCookie')
      .assign({'count': cookie.count})
      .write();
    
    res.cookie("IdCookie", "12337fgd45sdqqAc6834565");
    res.render("home.pug");
    return;
  }
  
  next();
}
