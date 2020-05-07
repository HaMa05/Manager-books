const db = require("../db");
module.exports.perPage = (model) => {
  return (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let limit = 10;
    let start = (page - 1) * limit;
    let end = page * limit;

    let result = {};
    if (end < model.length) {
      result.next = page + 1;
    }

    result.page = page;

    if (start > 0) {
      result.previous = page - 1;
    }

    result.perPage = model.slice(start, end);
    res.locals.result = result;
    next();
  };
};
