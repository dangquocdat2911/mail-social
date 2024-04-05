const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("test", (req, res) => {
  return res.json("connect success");
});

app.post("/send-email", (req, res) => {
  console.log(req.body, req.params, req.query);
  const { name, email, phone, comment } = req.body;
  let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
      user: "phuongnam.ltc0203@gmail.com",
      pass: "lethicham0203",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: `${req.body.name}<phuongnam.ltc0203@gmail.com>`,
    to: "dangquocdat2911@gmail.com",
    subject: "Mail liên hệ từ web: cochamduhoc.com",
    text: `Dear Châm:\n
    Người có tên: ${name}
    Email: ${email}
    Email: ${phone}
    Nội dung liên hệ: ${comment}
    `,
  };
  console.log(123);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.send("Email sending failed!");
    } else {
      console.log("Email sent: " + info.response);
      return res.send("Email sent successfully!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
