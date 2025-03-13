import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Button, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

const CardProduto = ({ produto, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 'auto',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <CardMedia
                image={produto.imagem?.data || `images/${produto.imagem}`}
                title={produto.nome}
                sx={{
                    height: 200,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <CardContent>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {produto.descricao}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" color="primary">
                        R$ {produto.preco}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Estoque: {produto.estoque}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-evenly', padding: '16px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => navigate("/editar-produto/" + produto.id)}
                    sx={{
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                    }}
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(produto.id)}
                    sx={{
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                    }}
                >
                    Excluir
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardProduto;