import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

const CardProduto = ({ produto, onDelete}) => {
    const navigate = useNavigate();
    return (
        <Card>
            <CardMedia
                image={produto.imagem?.data || `images/${produto.imagem}`} // Exibe a imagem em Base64 ou um padrão
                title={produto.nome}
                sx={{
                    height: 300,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
            />
            <CardContent>
                <h3>{produto.nome}</h3>
                <p>{produto.descricao}</p>
                <p>R$ {produto.preco}</p>
                <p>Estoque: {produto.estoque}</p>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-evenly'}}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate("/editar-produto/" + produto.id)}
                >
                    <EditIcon/>
                    Editar
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={()=>onDelete(produto.id)}
                >
                        <DeleteIcon/>
                        Excluir
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardProduto;