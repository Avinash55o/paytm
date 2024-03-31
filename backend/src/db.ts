import mongoose from "mongoose";


const Schema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const BankSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
});


export const User = mongoose.model("user", Schema);
export const Account=mongoose.model("Account",BankSchema);
