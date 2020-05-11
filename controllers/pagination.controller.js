const db = require("../db");
const shortid = require("shortid");
module.exports.get = (req, res) => {
  let result = res.locals.result;

  let sessionId = req.signedCookies.sessionId;
  let bookRent = db.get("session")
                   .find({sessionId: sessionId})
                   .get("book")
                   .value()
  var amountBookRent = 0;
  for(var id in bookRent) {
      amountBookRent += bookRent[id];
  }

  res.render("product/displayProduct.pug", {
    books: result.perPage,
    next: result.next,
    page: result.page,
    previous: result.previous,
    amount: amountBookRent
  });
}

module.exports.addToBook = (req, res, next) => {
  let productId = req.params.id;
  let sessionId = req.signedCookies.sessionId;

  // check sessionId
  if(!sessionId) {
    res.redirect("/products");
    return;
  }

  let count = db.get("session")
                .find({sessionId: sessionId})
                .get("book." + productId, 0)
                .value()

  db.get("session")
    .find({sessionId: sessionId})
    .set("book." + productId, count + 1)
    .write()

  res.redirect("/products");
}

module.exports.addAll = (req, res) => {
  let sessionId = req.signedCookies.sessionId;
  let cookieId = req.signedCookies.cookieId;

  if(!cookieId) {
    res.render("auth/login.pug");
    return;
  }
  
  // id của book được người dùng thêm
  let books = db.get("session")
                .find({sessionId: sessionId})
                .get("book")
                .value();
  
  let obj = {
    userId: cookieId,
    isComplete: false
  }                
  // chuyển đổi key và value của book vào từng mảng riêng biệt                
  let storeBook = [];
  for(let key in books) {
    storeBook.push({
      "bookId" : key.toString(),
      "id": shortid.generate(),
      "amount" : parseInt(books[key].toString())
    });
  }

  for(let book in storeBook) {
    Object.assign(storeBook[book], obj);
    db.get("collections")
    .push(storeBook[book])
    .write()
  }

  // reset dữ liệu trường book của session trong db
  db.get("session")
    .find({sessionId: sessionId})
    .unset("book")
    .write()

  res.redirect('/transactions');
}