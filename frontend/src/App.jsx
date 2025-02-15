// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import Unidades from './pages/Unidades';
import Reservas from './pages/Reservas';
import Visitas from './pages/Visitas';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/unidades">
            Unidades
          </Button>
          <Button color="inherit" component={Link} to="/reservas">
            Reservas
          </Button>
          <Button color="inherit" component={Link} to="/visitas">
            Visitas
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Registro
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/visitas" element={<Visitas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;