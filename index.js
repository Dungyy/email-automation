const express = require("express");
const nodeMailer = require("nodemailer");
const cron = require("node-cron");
const app = express();
const PORT = process.env.PORT || 9000;

require("dotenv").config();

// Email Message Options
const mailOptions = {
  from: process.env.USER_EMAIL,
  to: process.env.EMAIL_RECEIVER,
  subject: "Hey There ❤️",
  //   text: "Hello  This is Erick Munoz.",
  html: "<html> <body style='color:#8FBDD3;background-color:#DFDFDE;'> <h2> WELCOME </h2> <br />  <h3>Hey, This is a example of a Email Automation set up</h3><br /> Ok, i gotta go now, back to coding! Dont forget to Check out my Website! </body> <p style='color:#65C18C'>Erick Munoz <br/> Software Developer <a href='https://erickmunoz.tech'> <br/>www.ErickMunoz.Tech</a></p></html>",
};

// email Transport config
const transporter = nodeMailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

// NODE-CRON Automation Set-up
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

// send email
cron.schedule("* * * * * * ", () => {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent! :) " + "STATUS: " + info.response);
    }
  });
});

// Server
app.listen(PORT, () => console.log(`SERVER RUNNING | PORT: ${PORT}`));
