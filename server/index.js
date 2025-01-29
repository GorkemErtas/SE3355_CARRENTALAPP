require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const officeRoutes = require('./routes/offices');
const carRoutes = require('./routes/cars');
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/user");
const googleAuthRoutes = require("./routes/googleAuth");


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/offices', officeRoutes);
app.use('/api/cars', carRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));

