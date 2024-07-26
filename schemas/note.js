//import { Schema, model } from "mongoose";
const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
    
   
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
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