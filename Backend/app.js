// Use of .env
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

//Set up express app
const app = express()
const port = 3000

// app.use(express.static('public'))
// this if we need to serve pbulic files 

//Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Vite default port 5173
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // instead of express-body-parser

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGODB_PW}@golfan.ahkl3nj.mongodb.net/?appName=golfan`)
  .then(() => {
    app.listen(port)
    console.log('MongoDB connected, listening on port 3000!')
  })
  .catch(err => console.log(err));

// going to use REST api for my registration/login routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello Golf Fans, this is Node.js!' });
})

app.use('/api/auth', authRoutes);
