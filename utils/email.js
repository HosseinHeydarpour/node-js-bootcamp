const ndoemailer = require('nodemailer');

const sendEmail = async (options) => {
  //  1. Create transporter
  // const transporter = ndoemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  //   // "Activate less secure app " option
  // });

  const transporter = ndoemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2. Email options
  const mailOptions = {
    from: 'Hossein Heydarpour <Hello@hossien.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3. Send email withnodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
