import { useState } from "react"
import "../app.css"
import { TextField, Container, Grid2, Pagination, Button, Modal, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import CardProduto from "./cardProduto";
import CadastroProduto from "./CadastroProduto";

import { getProdutos, addProduto, updateProduto, deleteProduto } from "../data/db";

const Home = () => {
  const [produtos, setProdutos] = useState(getProdutos());
  const [currentPage, setCurrentPage] = useState(1)

  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalDeletar, setModalDeletar] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const filteredProducts = produtos.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsPerPage = 6
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
      <Grid2 container spacing={2}
        sx={{ alignItems: "stratch", marginBottom: "20px"}}
      >
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
            onClick={()=>setModalCadastro(true)}
            sx={{ height: "100%" }}
          >
            <AddIcon/>
            Cadastrar produto
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} className="product-grid">
        {currentProducts.map((product) => (
          <Grid2 size={4} key={product.id}>
            <CardProduto produto={product} 
            onClickEditar={()=>{
              setModalEditar(true)
            }} 
            onClickDeletar={()=>{
              setModalDeletar(true)
            }}
            />
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

      <Modal
        open={modalCadastro}
        onClose={()=>setModalCadastro(false)}
        aria-labelledby="modal-cadastrar-produto"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // 
          }}
        >
            <CadastroProduto/>
        </Box>
      </Modal>

      <Modal
        open={modalEditar}
        onClose={()=>setModalEditar(false)}
        aria-labelledby="modal-editar-produto"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
            Modal Editar
        </Box>
      </Modal>

      <Modal
        open={modalDeletar}
        onClose={()=>setModalDeletar(false)}
        aria-labelledby="modal-deletar-produto"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // 
          }}
        >
            Modal Deletar
        </Box>
      </Modal>

    </Container>
  );
};

export default Home;
