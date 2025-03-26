const { get } = require('http');
const Produto = require('../model/produto');
const { Buffer } = require('buffer');

module.exports = {
    async index(req, res) {
        const produtos = await Produto.findMany();

        const produtosComImagem = produtos.map(produto => {
            if (produto.imagem) {
              const imagemBase64 = Buffer.from(produto.imagem).toString('base64');
              console.log(imagemBase64);
              const tipoImagem = 'image/jpg';
              produto.imagemDataUri = `data:${tipoImagem};base64,${imagemBase64}`;
            }
            return produto;
          });
          
        res.status(200).json(produtosComImagem);
    },

    async store(req, res) {
        const { nome, descricao, preco, categoria, estoque, imagem } = req.body;
        const base64Data = imagem.data.replace(/^data:image\/\w+;base64,/, '');
        const imagemBuffer = Buffer.from(base64Data, 'base64');
        try {
            const novoProduto = await Produto.create({
                data: {
                    nome,
                    descricao,
                    preco: parseFloat(preco),
                    categoria,
                    estoque: parseInt(estoque),
                    imagem: imagemBuffer
                }
            });
            res.status(201).json(novoProduto);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Erro ao adicionar produto' });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, descricao, preco, categoria, estoque, imagem } = req.body;
        try {
            const atualizado = await Produto.update({
                data: {
                    id: parseInt(id),
                    nome,
                    descricao,
                    preco,
                    categoria,
                    estoque,
                    imagem
                },
                where: { id: parseInt(id) }
            });
            res.status(200).json(atualizado);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletado = await Produto.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json(deletado);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try {
            const produto = await Produto.findUnique({
                where: { id: parseInt(id) }
            });
            res.status(200).json(produto);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }
}