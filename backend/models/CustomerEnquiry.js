const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
    name:{
        type:String,
        required:true,
        // unique: true
    },
    phone: {
        type:String,
        required:true,
    },
    travelernumber:{
        type:String,
        required:true,
    },
    leavingFrom:{
        type:String,
        required:true,
    },
    goingTo:{
        type:String,
        required:true,
    },
    additionalDetails:{
        type:String,
        required:true,
    },
    agentassigned:{
        type: [String], // or [Schema.Types.ObjectId] if referencing another model
  default: [],
        required:true,
    },
    submittedAt: {
    type: Date,
    default: Date.now,
  }
})

const EnquiryModel = mongoose.model("customer_enquiry",EnquirySchema);

module.exports = EnquiryModel;