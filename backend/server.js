const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');
const logger = require('./middlewares/logger');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
