import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";
import { TextField, Container, Grid2, Pagination, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardProduto from "./CardProduto";

let products = [
  { id: 1, name: "Batom Vermelho", description: "Alta pigmentação", price: 39.9, stock: 50, image: "batom-vermelho.jpg" },
  { id: 2, name: "Base Matte", description: "Cobertura completa", price: 79.9, stock: 30, image: "base-matte.png" },
  { id: 3, name: "Sombra Neon", description: "Cores vibrantes", price: 49.9, stock: 20, image: "sombra-neon.jpeg" },
];

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <Container className="container">
      <h1>Gerenciamento de Produtos</h1>
      <Grid2 container spacing={2} sx={{ alignItems: "stratch", marginBottom: "20px" }}>
        <Grid2 size={7}>
          <TextField
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastrar-produto")}
            sx={{ height: "100%" }}
          >
            <AddIcon />
            Cadastrar produto
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} className="product-grid">
        {currentProducts.map((product) => (
          <Grid2 size={4} key={product.id}>
            <CardProduto produto={product} />
          </Grid2>
        ))}
      </Grid2>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Container>
  );
};

export default Home;
