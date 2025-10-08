const express = require('express');
const mongoose = require('mongoose');

// TODO - Update your mongoDB Atals Url here to Connect to the database
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/week06_notes";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

const noteRoutes = require('./routes/NoteRoutes');
app.use('/api/v1', noteRoutes);

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});