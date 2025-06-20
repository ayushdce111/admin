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
    message:{
        type:String,
        required:true,
    },
    submittedAt: {
    type: Date,
    default: Date.now,
  }
})

const EnquiryModel = mongoose.model("customer_enquiry",EnquirySchema);

module.exports = EnquiryModel;