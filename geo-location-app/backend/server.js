require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Place = require('./models/Place');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/geoapp';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Healthcheck
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Geo Backend API' });
});

// List all places
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar registros' });
  }
});

// Create new place
app.post('/api/places', async (req, res) => {
  try {
    const { title, description, latitude, longitude, photo } = req.body;

    if (!title || !description || latitude == null || longitude == null) {
      return res.status(400).json({ error: 'Campos obrigatórios: title, description, latitude, longitude' });
    }

    const place = new Place({
      title,
      description,
      latitude,
      longitude,
      photo: photo || null,
    });

    await place.save();
    res.status(201).json(place);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar registro' });
  }
});

mongoose
  .connect(MONGO_URI, { })
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB', err);
    process.exit(1);
  });
