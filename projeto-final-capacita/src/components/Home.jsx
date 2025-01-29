import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";
import { TextField, Container, Grid2, Pagination, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardProduto from "./CardProduto";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Função para carregar produtos do localStorage
  const loadProducts = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
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

  // Função para excluir um produto
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

  // Carregar produtos ao montar o componente
  useEffect(() => {
    loadProducts();
  }, []);

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
            <CardProduto produto={product} onDelete={handleDelete} />
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
