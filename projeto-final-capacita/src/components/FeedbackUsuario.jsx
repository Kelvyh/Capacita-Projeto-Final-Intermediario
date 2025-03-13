import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Slider,
  Grid,
} from "@mui/material";

const FeedbackUsuario = () => {
  const [feedback, setFeedback] = useState({
    nome: "",
    avaliacao: 5,
    comentario: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSliderChange = (e, value) => {
    setFeedback({ ...feedback, avaliacao: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!feedback.nome) tempErrors.nome = "O nome é obrigatório!";
    if (!feedback.comentario)
      tempErrors.comentario = "O comentário é obrigatório!";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Feedback enviado:", feedback);
      setSnackbarOpen(true);
      setFeedback({ nome: "", avaliacao: 5, comentario: "" });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "20px",
        backgroundColor: "#f3e5f5",
        borderRadius: "12px",
        boxShadow: 4,
        marginTop: "30px",
      }}
    >
      <Box textAlign="center" sx={{ marginBottom: "20px" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#7b1fa2",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Feedback do Usuário
        </Typography>
        <Typography variant="body1" sx={{ color: "#4a148c" }}>
          Sua opinião é muito importante para nós!
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Seu Nome"
              name="nome"
              value={feedback.nome}
              onChange={handleChange}
              error={Boolean(errors.nome)}
              helperText={errors.nome}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ marginBottom: "5px", color: "#4a148c" }}
            >
              Avaliação:
            </Typography>
            <Slider
              value={feedback.avaliacao}
              onChange={handleSliderChange}
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
              sx={{
                color: "#7b1fa2",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Seu Comentário"
              name="comentario"
              value={feedback.comentario}
              onChange={handleChange}
              error={Boolean(errors.comentario)}
              helperText={errors.comentario}
              multiline
              rows={4}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#7b1fa2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#6a1b9a",
                },
              }}
            >
              Enviar Feedback
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Obrigado pelo seu feedback!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackUsuario;
