
//import { Schema, model } from "mongoose";
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    unique: true
  
  },
  password: {
    type: String,
    required: true
    
  },
  email: {
    type: String,
    required: true,
    unique:true

  }
});
userSchema.pre('save',async function(){
  try{
    var user = this;
    const salt = await (bcrypt.genSalt(10));
    const hashpass = await bcrypt.hash(user.password,salt);
    user.password = hashpass;

  }catch(error) {
    throw error;
  }
});
userSchema.methods.comparePassword = async function ( userPassword){
  try{
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
  }catch(error){
    throw error;
  }
}

module.exports = mongoose.model('User', userSchema);