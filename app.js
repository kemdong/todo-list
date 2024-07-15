const express = require('express');
//const mongoose = require('mongoose');
const body_parser = require('body-parser');
const userRouter = require('./router/user.router');
const NoteRouter = require('./router/note.router');
const app = express();

app.use(body_parser.json()); 


app.use('/api/users', userRouter);

app.use('/api/notes', NoteRouter);

module.exports = app;