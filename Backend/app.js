// Use of .env
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

//Routes
const authRoutes = require('./routes/authRoutes');
const golferRoutes = require('./routes/golferRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const lineupRoutes = require('./routes/lineupRoutes')

//Set up express app/port
const app = express()
const port = 3000

// app.use(express.static('public'))
// this if we need to serve pbulic files 

//Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Vite default port 5173
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // instead of express-body-parser

connectDb();

// going to use REST api for my registration/login routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello Golf Fans, this is Node.js!' });
})

app.use('/api/auth', authRoutes);
app.use('/api/golfers', golferRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/lineups', lineupRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});