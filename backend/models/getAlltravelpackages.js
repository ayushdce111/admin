const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getAlltravelpackagesSchema = new Schema({
    title:{
        type:String,
        // required:true,
        // unique: true
    },
    destinations: {
        type:String,
        // required:true,
    },
    duration:{
        type:String,
        // required:true,
    },
    description:{
        type:String,
        // required:true,
    },
    prices:{
        type:String,
        // required:true,
    },
    travelMode:{
        type:String,
        // required:true,
    },
    inclusions: {
        type:String,
        // required:true,
    },
    availability: {
        type:String,
        // required:true,
    },
    user_email:{
        type:String,
        // required:true,
    }
})

const getAlltravelpackagesModel = mongoose.model("travelpackage",getAlltravelpackagesSchema);

module.exports = getAlltravelpackagesModel;