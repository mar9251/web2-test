import express from "express";
import nodemailer from "nodemailer";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname + "/frontend"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mammarr4220@gmail.com",
    pass: "YOUR_APP_PASSWORD"
  }
});

// Handle form submission
app.post("/submit", async (req, res) => {

  const { name, email, message } = req.body;

  const mailOptions = {

    from: "YOUR_GMAIL@gmail.com",

    to: "mammarr4220@gmail.com",

    subject: `New Portfolio Message From ${name}`,

    text:
  `Name: ${name}

  Email: ${email}

  Message:
${message}`

  };

  try {

    await transporter.sendMail(mailOptions);

    console.log(req.body);

    res.send("Form submitted successfully!");

  } catch (error) {

    console.log(error);

    res.status(500).send("Failed to send email.");

  }

});

app.listen(port, () => {
  console.log(`The app server is successfully running on port ${port}`);
});