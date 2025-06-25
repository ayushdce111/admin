const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    userrole:{
        type:String,
        required:true,
    },
    submittedAt: {
    type: Date,
    default: Date.now,
  },
  agentStatus:{
    type: String
  },
  agentCredit:{
    type:Number
  }
})

const UserModel = mongoose.model("allUsers",UserSchema);

module.exports = UserModel;