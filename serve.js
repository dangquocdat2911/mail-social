const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "dquocdat2911@gmail.com",
    pass: "Dat@19008198",
  },
});

app.get("/test", (req, res) => {
  return res.json("connect success");
});

app.post("/send-email", (req, res) => {
  const { name, email, phone, comment } = req.body;
  const mailOptions = {
    from: "dquocdat2911@gmail.com",
    to: "dangquocdat2911@gmail.com",
    subject: "Mail liên hệ từ web: cochamduhoc.com",
    text: `Dear Châm:\n
    Người có tên: ${name}
    Email: ${email}
    Email: ${phone}
    Nội dung liên hệ: ${comment}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Email sending failed!");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
