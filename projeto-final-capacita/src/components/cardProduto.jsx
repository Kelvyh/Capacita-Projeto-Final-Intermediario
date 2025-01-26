

const CardProduto = ({produto}) => {

    const produtoPathImg = (produtoPath) => 
        new URL(`../assets/produtos/${produtoPath}`, import.meta.url).href;

    return (
        <div className="card" key={produto.id}>
            <img src={produtoPathImg(produto.image)} alt={produto.name} />
            <h2>{produto.name}</h2>
            <p>{produto.description}</p>
            <p>R$ {produto.price}</p>
            <p>Estoque: {produto.stock}</p>
        </div>
    );
}

export default CardProduto;