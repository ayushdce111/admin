const travelpackageModel = require("../models/travelpackages.js");
// const getAlltravelpackagesModel = require("../models/getAlltravelpackages.js");

const travelpackages = async(req,res)=>{
    try{
        // console.log(req.body.formData,"<---------req.body 1");
        const user_email = req.body.UserEmail;
        const { title,destinations,duration ,description, prices, travelMode, inclusions, availability } = req.body.formData;
        const existingtitle = await travelpackageModel.findOne({ title });
        if (existingtitle) {
            return res.status(409).json({ success: false, message: 'Package already exists' });
        }
        //  console.log(req.body.UserEmail,"<---------req.body 2");
        const completePackage = new travelpackageModel({ title,destinations,duration ,description, prices, travelMode, inclusions, availability, user_email });
                // user.password = await bcrypt.hash(password, 10);
                // console.log(user,"<-------------user.userRole--",user.userrole)
                await completePackage.save();
                res.status(201).json({ success: true, message: "packages added successfully" });
        // res.json(packages);
        // res.status(201).json({message:"packages added successfully"})

    }catch(error){
        res.status(500).json({message:error});
    }
}
const getAlltravelpackages = async (req,res)=>{
    // console.log(req.body,"serevr  resp");
    try{
        const packages = await travelpackageModel.find().sort({submittedAt:-1});
        // console.log(packages);
        res.status(200).json(packages);
        }catch(error){
            res.status(500).json({message:error});
        }
}
module.exports = {travelpackages,getAlltravelpackages};