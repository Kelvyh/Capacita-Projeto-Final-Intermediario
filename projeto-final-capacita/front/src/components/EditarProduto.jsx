import { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getProdutoById, updateProduto } from '../api';

const EditarProduto = () => {
  const { id } = useParams(); // Captura o ID do produto da URL
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    imagem: null,
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProduto = async () => {
      
      const produtoToEdit = await getProdutoById(id);
  
      if (produtoToEdit) {
        setProduto(produtoToEdit);
      } else {
        navigate('/'); // Caso o produto não seja encontrado, redireciona para a página inicial
      }
    };
  
    fetchProduto();
  
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidSize = file.size <= 5 * 1024 * 1024;
    const isValidType = ["image/jpeg", "image/png"].includes(file.type);

    if (!isValidSize) {
      alert("A imagem é muito grande (máximo 5MB).");
      return;
    }

    if (!isValidType) {
      alert("Formato de imagem inválido. Use JPEG ou PNG.");
      return;
    }

    const formattedFileName = produto.nome
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Converter imagem para Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduto({
        ...produto,
        imagem: {
          name: `${formattedFileName}.${file.type.split("/")[1]}`, // Nome formatado
          data: reader.result, // Base64 da imagem
        },
      });
      setErrors((prev) => ({ ...prev, imagem: null }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    let tempErrors = {};
    if (!produto.nome) tempErrors.nome = "Nome do produto é obrigatório!";
    if (!produto.descricao) tempErrors.descricao = "Descrição do produto é obrigatória!";
    if (!produto.preco) tempErrors.preco = "Preço é obrigatório!";
    if (!produto.estoque) tempErrors.estoque = "Quantidade em estoque é obrigatória!";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Recupera os produtos do localStorage
      // const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      // const updatedProducts = storedProducts.map((p) =>
      //   p.id === parseInt(id) ? { ...produto, id: p.id } : p
      // );

      // localStorage.setItem('products', JSON.stringify(updatedProducts));
      await updateProduto(id, produto).then(() => {
        navigate('/');
      });

      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '20px', backgroundColor: '#fce4ec', borderRadius: '8px', boxShadow: 3 }}>
      <Box textAlign="center" sx={{ marginBottom: '20px' }}>
        <h2>Editar Produto</h2>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nome do Produto"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            error={Boolean(errors.nome)}
            helperText={errors.nome}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Descrição"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            error={Boolean(errors.descricao)}
            helperText={errors.descricao}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Preço"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            error={Boolean(errors.preco)}
            helperText={errors.preco}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Quantidade em Estoque"
            name="estoque"
            type="number"
            value={produto.estoque}
            onChange={handleChange}
            error={Boolean(errors.estoque)}
            helperText={errors.estoque}
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label">
            Upload de Imagem
            <input
              type="file"
              hidden
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
            />
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: '#d81b60', color: 'white' }}
        >
          Atualizar Produto
        </Button>
      </form>
      <Box textAlign="center" sx={{ marginTop: '20px' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/')} // Navegar de volta para Home
        >
          Voltar para Home
        </Button>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Produto atualizado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditarProduto;
