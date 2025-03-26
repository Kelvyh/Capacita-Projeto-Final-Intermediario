const express = require("express")
const router = express.Router()


const produtoController = require("./controller/produtoController")

router.get('/produtos', produtoController.index);
router.post('/produtos', produtoController.store);
router.put('/produtos/:id', produtoController.update);
router.delete('/produtos/:id', produtoController.delete);
router.get('/produtos/:id', produtoController.getById);

module.exports = router;