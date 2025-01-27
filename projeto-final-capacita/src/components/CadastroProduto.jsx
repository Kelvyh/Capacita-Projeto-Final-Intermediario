import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: null,
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduto({
      ...produto,
      [name]: value
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return;

    const isValidSize = file.size <= 5 * 1024 * 1024
    const isValidType = ["image/jpeg", "image/png"].includes(file.type)

    if (!isValidSize) {
      alert("A imagem é muito grande (máximo 5MB).");
      return;
    }

    if (!isValidType) {
      alert("Formato de imagem inválido. Use JPEG ou PNG.")
      return
    }

    setProduto({
      ...produto,
      imagem: file
    });
    setErrors((prev) => ({ ...prev, imagem: null }))
  };

  const validate = () => {
    let tempErrors = {};
    if (!produto.nome) tempErrors.nome = "Nome do produto é obrigatório!";
    if (!produto.descricao) tempErrors.descricao = "Descrição do produto é obrigatória!";
    if (!produto.preco) tempErrors.preco = "Preço é obrigatório!";
    if (!produto.imagem) tempErrors.imagem = "Uma imagem é obrigatória!";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Produto cadastrado:", produto);
      setProduto({
        nome: "",
        descricao: "",
        preco: "",
        imagem: null,
      });
      setSnackbarOpen(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "20px",
        backgroundColor: "#fce4ec",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Box textAlign="center" sx={{ marginBottom: "20px" }}>
        <Typography variant="h4" sx={{ color: "#d81b60" }}>
          Cadastro de Produto
        </Typography>
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
          <Button variant="contained" component="label">
            Upload de Imagem
            <input
              type="file"
              hidden
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
            />
          </Button>
          {errors.imagem && (
            <Typography variant="body2" color="error">
              {errors.imagem}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#d81b60", color: "white" }}
        >
          Cadastrar Produto
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Produto cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CadastroProduto;
