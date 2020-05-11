const shortid = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
  let sessionId = shortid.generate();
  if(!req.signedCookies.sessionId) {
    res.cookie("sessionId", sessionId, {signed: true})

    db.get("session")
      .push({sessionId: sessionId})
      .write()
  }

  next();
}