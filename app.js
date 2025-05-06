require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

app.use('/api', uploadRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

