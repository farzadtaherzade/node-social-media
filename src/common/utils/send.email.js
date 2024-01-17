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
    from: "social node project",
    to: reciver,
    subject: "Send Confirm Email",
    html: text,
  });
};

module.exports = { sendEmail };
