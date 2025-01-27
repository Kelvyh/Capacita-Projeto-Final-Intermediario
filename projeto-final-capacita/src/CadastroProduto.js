import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid, Box, Select, MenuItem, Snackbar, Alert } from "@mui/material";

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!produto.nome) tempErrors.nome = "Nome do produto é obrigatório!";
    if (!produto.descricao) tempErrors.descricao = "Descrição do produto é obrigatória!";
    if (!produto.preco || isNaN(produto.preco) || Number(produto.preco) <= 0)
      tempErrors.preco = "Preço deve ser um número positivo!";
    if (!produto.categoria) tempErrors.categoria = "Categoria é obrigatória!";
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
        categoria: "",
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
        minWidth: 300,
      }}
    >
      <Box textAlign="center" sx={{ marginBottom: "20px" }}>
        <Typography variant="h4" sx={{ color: "#d81b60" }}>
          Cadastro de Produto
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome do Produto"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
              error={Boolean(errors.nome)}
              helperText={errors.nome}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              name="descricao"
              value={produto.descricao}
              onChange={handleChange}
              error={Boolean(errors.descricao)}
              helperText={errors.descricao}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              label="Preço"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
              error={Boolean(errors.preco)}
              helperText={errors.preco}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth
              displayEmpty
              name="categoria"
              value={produto.categoria}
              onChange={handleChange}
              error={Boolean(errors.categoria)}
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="" disabled>
                Selecione uma categoria
              </MenuItem>
              <MenuItem value="batom">Batom</MenuItem>
              <MenuItem value="sombra">Sombra</MenuItem>
              <MenuItem value="base">Base</MenuItem>
            </Select>
            {errors.categoria && (
              <Typography variant="body2" color="error">
                {errors.categoria}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#d81b60",
                color: "white",
                "&:hover": {
                  backgroundColor: "#c2185b",
                },
              }}
            >
              Cadastrar Produto
            </Button>
          </Grid>
        </Grid>
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
