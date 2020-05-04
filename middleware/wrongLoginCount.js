const db = require('../db');

module.exports.wrongLogin = (user) => {
  user.wrongLoginCount++;
  db.get("users")
    .find({"id": user.id})
    .assign({'wrongLoginCount': user.wrongLoginCount})
    .write()
}
