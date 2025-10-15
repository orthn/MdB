const express = require('express');
const {connectDB} = require('./db-access/db');

const classRoutes = require('./routes/classRouter');
const userRoutes = require('./routes/userRouter');
const crypto = require("./services/cryptography");



const bodyParser = require("express");
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello, World! Welcome to my Express server.");
});

app.get('/test', (req, res) => {
    let pwd = crypto.generateRandomString()
    res.send(pwd);
})

app.use('/users', userRoutes);
app.use('/classes', classRoutes);

