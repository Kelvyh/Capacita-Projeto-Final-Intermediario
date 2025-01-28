import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importações para rotas
import Home from './components/Home';
import CadastroProduto from './components/CadastroProduto'; 
import { Modal, Box, Button } from '@mui/material';
import FeedbackUsuario from './components/FeedbackUsuario';

function App() {
  const [modalFeedback, setModalFeedback] = useState(false);

  return (
    <Router> {}
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/cadastrar-produto" element={<CadastroProduto />} /> {}
      </Routes>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setModalFeedback(true)}
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        Feedback
      </Button>

      <Modal
        open={modalFeedback}
        onClose={() => setModalFeedback(false)}
        aria-labelledby="modal-feedback-usuario"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <FeedbackUsuario />
        </Box>
      </Modal>
    </Router>
  );
}

export default App;
