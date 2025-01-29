import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";
import { TextField, Container, Grid2, Pagination, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardProduto from "./cardProduto";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container className="container" maxWidth="lg" sx={{ padding: 4, background: 'linear-gradient(45deg, #f3f3f3, #e0e0e0)' }}>
      <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Gerenciamento de Produtos</h1>
      <Grid2 container spacing={2} sx={{ alignItems: "center", marginBottom: "40px", flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid2 size={7}>
          <TextField
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}
          />
        </Grid2>
        <Grid2 size={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastrar-produto")}
            sx={{
              height: "100%",
              borderRadius: 2,
              boxShadow: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#1565c0',
                boxShadow: 3,
              },
            }}
          >
            <AddIcon sx={{ marginRight: 1 }} />
            Cadastrar produto
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={4} className="product-grid" sx={{ marginTop: 4 }}>
        {currentProducts.map((product) => (
          <Grid2 size={4} key={product.id}>
            <CardProduto produto={product} onDelete={handleDelete} sx={{ boxShadow: 3, borderRadius: 2 }} />
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
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <footer style={{ marginTop: '40px', textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <p>© 2025 Gerenciamento de Produtos. Todos os direitos reservados.</p>
      </footer>
    </Container>
  );
};

export default Home;