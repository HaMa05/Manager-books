const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
//automational create id
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views/');

const bookRouter = require('./router/book.router.js');
const userRouter = require('./router/user.router.js');
const transactionRouter = require('./router/transaction.router.js');
const indexRouter = require('./router/index.router.js');
const cookieCount = require("./middleware/cookie-count");

// use file in folder public
app.use(express.static('public'))

// Trang chính
app.use('/', indexRouter);

app.use('/books', cookieCount.count, bookRouter);
app.use('/users', cookieCount.count, userRouter);
app.use('/transactions', cookieCount.count, transactionRouter);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
