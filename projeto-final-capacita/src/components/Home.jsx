import React, { useState } from "react"
import "../app.css"
import CardProduto from "./cardProduto";
const products = [
  { id: 1, name: "Batom Vermelho", description: "Alta pigmentação", price: 39.9, stock: 50, image: "batom-vermelho.jpg" },
  { id: 2, name: "Base Matte", description: "Cobertura completa", price: 79.9, stock: 30, image: "base-matte.jpg" },
  { id: 3, name: "Sombra Neon", description: "Cores vibrantes", price: 49.9, stock: 20, image: "sombra-neon.jpg" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container">
      <h1>Loja de Cosméticos</h1>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
      />
      <div className="product-grid">
        {currentProducts.map((product) => (
          // <div className="product-card" key={product.id}>
          //   <img src={product.image} alt={product.name} />
          //   <h3>{product.name}</h3>
          //   <p>{product.description}</p>
          //   <p>R$ {product.price.toFixed(2)}</p>
          //   <p>Estoque: {product.stock}</p>
          // </div>
          <CardProduto key={product.id} produto={product} />
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: currentPage === page ? "#007bff" : "#ddd",
              color: currentPage === page ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
