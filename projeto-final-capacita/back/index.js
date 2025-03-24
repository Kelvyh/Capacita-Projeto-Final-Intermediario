const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');


const app = express();
const port = 3000;


app.use(express.json());
app.use(cors())

// Rota para listar todos os Produtos
app.get('/', async (req, res) => {
    const produto = await prisma.produto.findMany();
    res.json(produto);
});


// Rota para adicionar um novo Produto
app.post('/', async (req, res) => {
    const { , , , ,  } = req.body;
    try {
        const novoProduto = await prisma.produto.create({
            data: { , , , ,  }
        });
        res.json(novoProduto);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});

// Rota para atualizar um Produto
app.put('/produto/:id', async (req, res) => {
    const { id } = req.params;
    const { , , , ,  } = req.body;
    try {
        const atualizado = await prisma.produto.update({
            where: { id_produto: parseInt(id) },
            data: { , , , ,  }
        });
        res.json(atualizado);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

// Rota para deletar um Produto
app.delete('/produto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletado = await prisma.produto.delete({
            where: { id_produto: parseInt(id) }
        });
        res.json(deletado);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

// Populando o banco de dados produtos
app.get('/produto/populate', async (req, res) => {
    try {
        const dados = [
            {  },
            {  },
            {  },
            {  },
            {  },
        ];
        const produtoCriados = await prisma.produto.createMany({ data: dados });
        res.json(produtoCriados);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao popular banco de dados' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
