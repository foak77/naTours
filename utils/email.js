const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

  let xUser = process.env.EMAIL_USERNAME;
  let xPass = process.env.EMAIL_PASSWORD;
  let xPort = process.env.EMAIL_PORT;
  let xHost = process.env.EMAIL_HOST;

  // console.log(process.env.EMAIL_USERNAME);
  // console.log(process.env.EMAIL_PASSWORD);
  // console.log(process.env.EMAIL_HOST);
  // console.log(process.env.EMAIL_PORT);

  const transporter = nodemailer.createTransport({
    host: xHost,
    // host: 'smtp.mailtrap.io',
    port: xPort,
    // port: 2525,
    auth: {
      user: xUser,
      // user: '52b5f2b9fa0ab0',
      pass: xPass,
      // pass: '802145b6860e6e',
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Fred<fred@fred.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
