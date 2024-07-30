const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');


const user= require('./schemas/user');
const note= require('./schemas/note');
const mongoose = require('mongoose');
const path = require('path');

app.use(express.static(path.join(__dirname, 'Front-ends')));






// Allow only specific origin
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Your frontend URL
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Import your routes
const userRouter = require('./router/user.router');
const noteRouter = require('./router/note.router');

// Use the user routes for any request starting with /api/users
app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter); 

// Default route for testing
app.get('/', (req, res) => {
    res.send('Hello world....');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
