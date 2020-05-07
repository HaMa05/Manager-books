const db = require("../db");
module.exports.get = (req, res) => {
  let result = res.locals.result;
  res.render("product/displayProduct.pug", {
    books: result.perPage,
    next: result.next,
    page: result.page,
    previous: result.previous
  });
}