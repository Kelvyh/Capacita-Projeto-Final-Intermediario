const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Criar um novo produto
  const produto = await prisma.produto.create({
    data: {
      nome: 'Produto Exemplo',
      preco: 99.99,
    },
  })
  console.log(produto)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
