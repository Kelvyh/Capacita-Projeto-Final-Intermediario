import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Removi o useNavigate
import Home from "./components/Home";
import CadastroProduto from "./components/CadastroProduto";
import EditarProduto from "./components/EditarProduto";
import FeedbackUsuario from "./components/FeedbackUsuario";
import { Button } from "@mui/material";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
        <Route path="/editar-produto/:id" element={<EditarProduto />} />
        <Route path="/feedback" element={<FeedbackUsuario />} />
      </Routes>
      <Button
        component={Link}
        to="/feedback"
        variant="contained"
        color="secondary"
        sx={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        Feedback
      </Button>
    </Router>
  );
}

export default App;
