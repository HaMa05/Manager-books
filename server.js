const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//automational create id
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views');

const bookRouter = require('./public/book.js');
const userRouter = require('./public/user.js');
const transactionRouter = require('./public/transaction.js');

// Trang chính
app.get('/', (req, res) => {
	res.render('home.pug');
})

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
