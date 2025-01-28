import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CardProduto = ({ produto, onClickEditar, onClickDeletar }) => {

    return (
        <Card>
            <CardMedia
                image={`images/${produto.image}`}
                title={produto.name}
                sx={{
                    height: 300,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
            />
            <CardContent>
                <h3>{produto.name}</h3>
                <p>{produto.description}</p>
                <p>R$ {produto.price}</p>
                <p>Estoque: {produto.stock}</p>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-evenly'}}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={onClickEditar}
                >
                    <EditIcon/>
                    Editar
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={onClickDeletar}
                >
                        <DeleteIcon/>
                        Excluir
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardProduto;