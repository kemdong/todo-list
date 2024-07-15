const mongoose = require('mongoose');
const Note = require("./schemas/note")
const User = require("./schemas/user")

 //MongoDB connection URI
const dbURI = 'mongodb://localhost:27017/todoapp'; // Local MongoDB URI

  //to MongoDB
mongoose.connect(dbURI)
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

