const travelpackageModel = require("../models/agenttravelpackages.js");
// const EnquiryModel = require("../models/Enquiry.js");
// const getAlltravelpackagesModel = require("../models/getAlltravelpackages.js");
const EnquiryModel = require("../models/CustomerEnquiry.js");

const travelpackages = async(req,res)=>{
    try{
        // console.log(req.body,"<---------req.body 1");
        const user_email = req.body.UserEmail;
        const package_status = "pending";
        const { title,destinations,duration ,description, prices, travelMode, inclusions, availability,travelcategory } = req.body.formData;
        const existingtitle = await travelpackageModel.findOne({ title });
        if (existingtitle) {
            return res.status(409).json({ success: false, message: 'Package already exists' });
        }
        //  console.log(req.body.UserEmail,"<---------req.body 2");
        const completePackage = new travelpackageModel({ title,destinations,duration ,description, prices, travelMode, inclusions, availability, user_email,package_status,travelcategory });
                // user.password = await bcrypt.hash(password, 10);
                // console.log(user,"<-------------user.userRole--",user.userrole)
                await completePackage.save();
                res.status(201).json({ success: true, message: "packages added successfully" });
        // res.json(packages);
        // res.status(201).json({message:"packages added successfully"})

    }catch(error){
        console.log(error,"<-------------error 5065")
        res.status(500).json({message:error});
    }
}
const getAgenttravelpackages = async (req,res)=>{
   
    const { userEmail } = req.query;
     console.log(req.body,"serevr  resp",userEmail);
    try{
        const packagesAgent = await travelpackageModel.find({user_email:userEmail}).sort({submittedAt:-1});
        // console.log(packages);
        res.status(200).json(packagesAgent);
        }catch(error){
            console.log(error);
            res.status(500).json({message:error});
        }
}



const getagentassignedleads = async (req,res)=>{
   
    const { userEmail } = req.query;
     console.log(req.body,"serevr  resp",userEmail);
    try{
        const allleadsAgent = await EnquiryModel.find({agentassigned:userEmail}).sort({submittedAt:-1});
        // console.log(packages);
        res.status(200).json(allleadsAgent);
        }catch(error){
            console.log(error);
            res.status(500).json({message:error});
        }
}


module.exports = {travelpackages,getAgenttravelpackages, getagentassignedleads};