const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/UserRoutes');
const app = express();
const cors = require('cors');
// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Add this to parse JSON bodies
app.use('/users', router);

mongoose
    .connect('mongodb+srv://sanduherath0905:l7PxWPLGb6Lsa6JL@cluster0.sq5lf8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((err) => console.error('MongoDB connection error:', err));