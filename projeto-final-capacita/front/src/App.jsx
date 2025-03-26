import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Removi o useNavigate
import Home from "./components/Home";
import CadastroProduto from "./components/CadastroProduto";
import EditarProduto from "./components/EditarProduto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
        <Route path="/editar-produto/:id" element={<EditarProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
