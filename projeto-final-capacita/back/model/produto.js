const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Produto = prisma.produto

module.exports = Produto