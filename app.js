const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();

// Configurações Nodemailer
const EMAIL_CONSTRUTORA = process.env.EMAIL_CONSTRUTORA;
const SENHA_EMAIL = process.env.SENHA_EMAIL;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rotas
app.get("/", (req, res) => {
  res.render("index"); // Renderiza index.ejs
});

app.get("/fale", (req, res) => {
  res.render("fale_con"); // Renderiza fale_con.ejs
});

app.post("/enviar-contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const corpo = `
Novo contato do site:
Nome: ${nome}
Email: ${email}
Mensagem: ${mensagem}
`;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_CONSTRUTORA,
        pass: SENHA_EMAIL,
      },
    });

    let mailOptions = {
      from: `"${nome}" <${EMAIL_CONSTRUTORA}>`,
      to: EMAIL_CONSTRUTORA,
      subject: `Novo contato do site - ${nome}`,
      text: corpo,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.send("Mensagem enviada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao enviar mensagem.");
  }
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
