const nodemailer = require("nodemailer")
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.nodemailer_user,
      pass: process.env.nodemailer_pass
    }
});

module.exports = {transport}