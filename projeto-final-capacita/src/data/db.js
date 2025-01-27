

let products = [
    { id: 1, name: "Batom Vermelho", description: "Alta pigmentação", price: 39.9, stock: 50, image: "batom-vermelho.jpg" },
    { id: 2, name: "Base Matte", description: "Cobertura completa", price: 79.9, stock: 30, image: "base-matte.jpg" },
    { id: 3, name: "Sombra Neon", description: "Cores vibrantes", price: 49.9, stock: 20, image: "sombra-neon.jpg" },
];

export const getProdutos = () => {
    return products;
};

export const addProduto = (produto) => {
    produto.id = products.length + 1;
    products.push(produto);
    return produto;
}

export const updateProduto = (produto) => {
    const index = products.findIndex((p) => p.id === produto.id);
    products[index] = produto;
    return produto;
}

export const deleteProduto = (id) => {
    products = products.filter((p) => p.id !== id);
}