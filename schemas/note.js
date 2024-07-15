//import { Schema, model } from "mongoose";
const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
       required: true
    }
    //modifiedAt: {
       // type: Date,
        //required: true
    //},
    //completed: {
      //  type: Date,
       // required: true
    //},
});

//export default model('Note', noteSchema )
module.exports = mongoose.model('Note', noteSchema);