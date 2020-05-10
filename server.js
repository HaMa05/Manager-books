require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
//automational create id
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views/');

const bookRouter = require('./router/book.router.js');
const userRouter = require('./router/user.router.js');
const transactionRouter = require('./router/transaction.router.js');
const authRouter = require('./router/auth.router.js');
const indexRouter = require('./router/index.router.js');
const profileRouter = require("./router/profile.router.js");

const paginationRouter = require("./router/pagination.router.js");

const cookieCount = require("./middleware/cookie-count");
const middlewareAuth = require('./middleware/auth.middleware.js');

// use file in folder public
app.use(express.static('public'))

// Trang chính
app.use('/', indexRouter);

app.use('/auth', /*cookieCount.count*/ authRouter);
app.use('/books', /*cookieCount.count*/ middlewareAuth.requireAuth, bookRouter);
app.use('/users', /*cookieCount.count*/ middlewareAuth.requireAuth, userRouter);
app.use('/transactions', /*cookieCount.count*/ middlewareAuth.requireAuth, transactionRouter);
app.use("/products", middlewareAuth.requireAuth, paginationRouter);
app.use("/profile", middlewareAuth.requireAuth, profileRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
