import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Container, Grid, Pagination, Button, Box, Typography, AppBar, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CardProduto from "./cardProduto";
import SpaIcon from "@mui/icons-material/Spa";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const loadProducts = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      if (parsedProducts.length !== products.length) {
        setProducts(parsedProducts);
      }
    } else {
      const defaultProducts = [
        { id: 1, nome: "Batom Vermelho", descricao: "Alta pigmentação", preco: 39.9, estoque: 50, imagem: "batom-vermelho.jpg" },
        { id: 2, nome: "Base Matte", descricao: "Cobertura completa", preco: 79.9, estoque: 30, imagem: "base-matte.png" },
        { id: 3, nome: "Sombra Neon", descricao: "Cores vibrantes", preco: 49.9, estoque: 20, imagem: "sombra-neon.jpeg" },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: "linear-gradient(to bottom, #ffe0e0, #ffffff)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "40px"
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(255, 204, 203, 0.9)",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "10px 0",
          transition: "0.3s",
        }}
      >

        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SpaIcon sx={{ fontSize: "2.5rem", color: "#d32f2f" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #d32f2f, #ff6f61)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Gerenciamento de Cosméticos
              </Typography>
            </Box>
            <LocalMallIcon sx={{ fontSize: "2rem", color: "#d32f2f" }} />
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ padding: "40px 0" }}>
        {/* Barra de pesquisa e botão */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <TextField
            type="text"
            placeholder="Busque por um produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: "500px",
              borderRadius: "25px",
              backgroundColor: "#fff",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              transition: "0.3s",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                "&:hover fieldset": { borderColor: "#ff6f61" },
                "&.Mui-focused fieldset": { borderColor: "#d32f2f", borderWidth: "2px" },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#d32f2f", mr: 1 }} />,
            }}
          />
          <Button>
            variant="contained"
            onClick={() => navigate("/cliente")}
            sx={{
              borderRadius: "25px",
              padding: "12px 24px",
              background: "linear-gradient(45deg, #d32f2f, #ff6f61)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(45deg, #ff6f61, #d32f2f)",
              }
            }}
    
          </Button>
        </Box>

        {/* Grid de produtos */}
        <Grid container spacing={3} justifyContent="center">
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <CardProduto produto={product} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#ffe0e0",
              },
              "&.Mui-selected": {
                backgroundColor: "#d32f2f",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#ff6f61",
                }
              }
            }
          }}
        />

        <Box
          sx={{
            mt: 5,
            textAlign: "center",
            padding: "20px",
            background: "linear-gradient(45deg, #ffcccb, #ffb6c1)",
            borderRadius: "12px",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#666",
            opacity: "0.9",
          }}
        >
          © 2025 Gerenciamento de Produtos. Todos os direitos reservados.
        </Box>
      </Container>
    </Box>
  );
};

export default Home;