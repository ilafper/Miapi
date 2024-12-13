const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Lista de usuarios
const users = [
  {
    id: 1,
    nombre: "Juan",
    ap1: "Pérez",
    direccion: "Calle Falsa 123",
    dni: "12345678A"
  },
  {
    id: 2,
    nombre: "María",
    ap1: "Gómez",
    direccion: "Avenida Siempre Viva 742",
    dni: "23456789B"
  },
  {
    id: 3,
    nombre: "Luis",
    ap1: "Martínez",
    direccion: "Plaza Mayor 5",
    dni: "34567890C"
  },
  {
    id: 4,
    nombre: "Dani",
    ap1: "Martínez",
    direccion: "Calle Falsa 1",
    dni: "12345678D"
  },
  {
    id: 5,
    nombre: "Laura",
    ap1: "Fernández",
    direccion: "Calle del Sol 45",
    dni: "23456780E"
  },
  {
    id: 6,
    nombre: "Pedro",
    ap1: "González",
    direccion: "Avenida de la Paz 10",
    dni: "34567891F"
  },
  {
    id: 7,
    nombre: "Ana",
    ap1: "López",
    direccion: "Calle Libertad 30",
    dni: "45678902G"
  },
  {
    id: 8,
    nombre: "Carlos",
    ap1: "Sánchez",
    direccion: "Calle Real 67",
    dni: "56789013H"
  },
  {
    id: 9,
    nombre: "Elena",
    ap1: "Ramírez",
    direccion: "Avenida de la Constitución 98",
    dni: "67890124I"
  }
];

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Endpoint GET para obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint POST para crear un nuevo usuario
app.post('/nuevo', (req, res) => {
  const { nombre, ap1, direccion, dni } = req.body;
  
  // Generar un ID único para el nuevo usuario (en este caso, el siguiente número en la lista)
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  // Crear el nuevo usuario
  const newUser = {
    id: newId,
    nombre,
    ap1,
    direccion,
    dni
  };
  users.push(newUser);
  res.json({"mensaje":"asdasdasdasda"})
});

app.get('/buscar', (req, res) => {
  const query = req.query.q?.toLowerCase(); // Parámetro de búsqueda
  if (!query) {
    return res.status(400).json({ error: "Debes proporcionar un término de búsqueda." });
  }

  // Filtrar usuarios por nombre, apellido o dirección que coincidan con la búsqueda
  const resultados = users.filter(user => 
    user.nombre.toLowerCase().includes(query) ||
    user.ap1.toLowerCase().includes(query) ||
    user.direccion.toLowerCase().includes(query)
  );

  res.json(resultados);
});
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
