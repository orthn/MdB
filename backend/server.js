const express = require('express');
const {connectDB} = require('./database/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

const classes = require('./routes/classRouter');
const students = require('./routes/studentRouter');
const challenges = require('./routes/challengesRouter');
const progress = require('./routes/progressRouter');
const leaderboard = require('./routes/leaderboardRouter');
const seed = require('./routes/seedRouter');
const statistics = require('./routes/statisticsRouter');
const helpers = require("./services/helper");

const bodyParser = require("express");
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

let timeoutForDbConnection = process.env.DB_CONNECTION_TIMEOUT || 3000;
connectDB(timeoutForDbConnection)
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello, World! Welcome to my Express server.");
});

app.get('/test', (req, res) => {
    let pwd = helpers.generateRandomPassword()
    res.send(pwd);
})

app.use('/seed', seed);
app.use('/users', students);
app.use('/students', students);
app.use('/progress', progress);
app.use('/classes', classes);
app.use('/leaderboard', leaderboard);
app.use('/challenges', challenges);
app.use('/statistics', statistics);

