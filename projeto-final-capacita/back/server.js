const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));  // Aumenta o limite do JSON
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Para formulários
app.use(cors())

const routes = require("./routes")
app.use("/api", routes)

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = { app, prisma };