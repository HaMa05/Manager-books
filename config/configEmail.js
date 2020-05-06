module.exports.sendMail = (emailUser) => {
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL, // user
      pass: process.env.PASSWORD // password
    }
  });

  // send mail with defined transport object
  var mailOptions = {
    from: '"Fred Foo 👻" <Hippo.webDeveloper@gmail.com>', // sender address
    to: emailUser, // list of receivers
    subject: "Cảnh báo", // Subject line
    text: "Tài khoản", // plain text body
    html: "<b>Tài khoản của bạn vừa đăng nhập sai quá 3 lần!</b>" // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}