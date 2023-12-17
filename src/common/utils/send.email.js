const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendEmail = async (text, reciver) => {
  const info = await transporter.sendMail({
    from: '"Me" <johnnycash@protonmail.com>',
    to: reciver,
    subject: "Send Confirm Email",
    html: text,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = { sendEmail };
