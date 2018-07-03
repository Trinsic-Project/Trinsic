const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.TRINSIC_EMAIL_ACCOUNT,
    pass: process.env.TRINSIC_GMAIL_PASSWORD
  }
});

function sendEmail(user) {
  const mailOptions = {
    from: process.env.TRINSIC_EMAIL_ACCOUNT,
    to: user.email,
    subject: 'Confirmation from Trinsic: You initialized a contract!',
    text: `Hello ${user.firstName} ${user.lastName}!\nYou are receiving this e-mail as a friendly reminder that you initiated a contract on our platform!\nBest, The Team at Trinsic`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function secureAsAdmin(req, res) {
  const isUser = req.hasOwnProperty('user');
  const isAdmin = isUser ? req.user.dataValues.isAdmin : false;
  if (!isAdmin) return res.status(403).send('FORBIDDEN');
}

module.exports = {
  sendEmail,
  secureAsAdmin
}
