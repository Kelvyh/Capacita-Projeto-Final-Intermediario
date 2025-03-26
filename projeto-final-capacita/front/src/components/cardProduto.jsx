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

    const handleEdit = () => navigate(`/editar-produto/${produto.id}`);
    const handleDelete = () => onDelete(produto.id);

    return (
        <Card sx={styles.card}>
            <CardMedia
                image={produto.imagem ? `${console.log(produto.imagem)}` : "images/default.jpg"}
                title={produto.nome}
                alt={produto.nome}
                sx={styles.cardMedia}
            />
            <CardContent sx={styles.cardContent}>
                <Typography variant="h6" component="h3" sx={styles.productName}>
                    {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={styles.productDescription}>
                    {produto.descricao}
                </Typography>
                <Box sx={styles.productInfo}>
                    <Typography variant="h6" sx={styles.productPrice}>
                        R$ {produto.preco.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={styles.productStock}>
                        Estoque: {produto.estoque}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={styles.cardActions}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    sx={styles.editButton}
                    aria-label="Editar produto"
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    sx={styles.deleteButton}
                    aria-label="Excluir produto"
                >
                    Excluir
                </Button>
            </CardActions>
        </Card>
    );
};

const styles = {
    card: {
        maxWidth: 300,
        borderRadius: "8px",
        margin: "auto",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    cardMedia: {
        height: 150,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "8px 8px 0 0",
    },
    cardContent: {
        flexGrow: 1,
        padding: "16px",
    },
    productName: {
        fontWeight: "bold",
        mb: 1,
        color: "#333",
        fontSize: "1.1rem",
    },
    productDescription: {
        mb: 1,
        fontSize: "0.9rem",
    },
    productInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
    },
    productPrice: {
        color: "#2E7D32",
        fontWeight: "bold",
        fontSize: "1rem",
    },
    productStock: {
        fontSize: "0.9rem",
    },
    cardActions: {
        justifyContent: "space-between",
        padding: "16px",
        borderTop: "1px solid #e0e0e0",
    },
    editButton: {
        textTransform: "none",
        borderRadius: "6px",
        padding: "6px 12px",
        fontWeight: "bold",
        border: "1px solid",
        fontSize: "0.9rem",
        "&:hover": {
            backgroundColor: "#e3f2fd",
        },
    },
    deleteButton: {
        textTransform: "none",
        borderRadius: "6px",
        padding: "6px 12px",
        fontWeight: "bold",
        boxShadow: "none",
        fontSize: "0.9rem",
        "&:hover": {
            backgroundColor: "#d32f2f",
        },
    },
};

export default CardProduto;