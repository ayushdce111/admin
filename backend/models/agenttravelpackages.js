const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelpackagesSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique: true
    },
    destinations: {
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    prices:{
        type:String,
        required:true,
    },
    travelMode:{
        type:String,
        required:true,
    },
    inclusions: {
        type:String,
        required:true,
    },
    availability: {
        type:String,
        required:true,
    },
    user_email:{
        type:String,
        required:true,
    },
    submittedAt: {
    type: Date,
    default: Date.now,
  },
  package_status:{
        type:String,
        required:true,
  },
  travelcategory:{
    type:String,
    required:true,
  },
    image_url: {
    type:String,
  },
  image_id:{
    type:String,
  }
})

const travelpackageModel = mongoose.model("agenttravelpackage",travelpackagesSchema);

module.exports = travelpackageModel;