// server.js
const express = require('express');
const mongoose = require('mongoose');
const uploadRoute = require('./routes/upload');
const authRoutes = require('./routes/signup.js');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/Firebase-project')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.use('/api', uploadRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
