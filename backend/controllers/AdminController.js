const travelpackageModel = require("../models/admintravelpackages.js");
const AgenttravelpackageModel = require("../models/agenttravelpackages.js")
const EnquiryModel = require("../models/CustomerEnquiry.js");
const UserModel = require("../models/AllUser.js");
// const getAlltravelpackagesModel = require("../models/getAlltravelpackages.js");

const travelpackages = async(req,res)=>{
    try{
        // console.log(req.body.formData,"<---------req.body 1");
        const user_email = req.body.UserEmail;
        const { title,destinations,duration ,description, prices, travelMode, inclusions, availability, travelcategory } = req.body.formData;
        const existingtitle = await travelpackageModel.findOne({ title });
        if (existingtitle) {
            return res.status(409).json({ success: false, message: 'Package already exists' });
        }
        //  console.log(req.body.UserEmail,"<---------req.body 2");
        const completePackage = new travelpackageModel({ title,destinations,duration ,description, prices, travelMode, inclusions, availability, user_email,travelcategory });
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
const getadmintravelpackages = async (req,res)=>{
    // console.log(req.body,"serevr  resp");
    try{
        const packages = await travelpackageModel.find().sort({submittedAt:-1});
        // console.log(packages);
        res.status(200).json(packages);
        }catch(error){
            res.status(500).json({message:error});
        }
}
const agenttravelpackages = async (req,res)=>{
    // console.log(req.body,"serevr  resp");
    try{
        const packages = await AgenttravelpackageModel.find().sort({submittedAt:-1});
        // console.log(packages);
        res.status(200).json(packages);
        }catch(error){
            res.status(500).json({message:error});
        }
}

const getAllEnquiry = async (req,res)=>{
    console.log(req.body,"serevr  resp");
    try{
        const packages1 = await EnquiryModel.find().sort({submittedAt:-1});
        // console.log(packages);
        res.status(200).json(packages1);
        }catch(error){
            res.status(500).json({message:error});
        }
}

const updatetravelpackages=async (req, res) => {
  const updates = req.body; // Expecting an array of users with _id and new status
// console.log(req.body,"<-----------updatetravelpackages");
const {updated_id, nextStatus }=req.body;
// console.log( title,destinations,duration ,description, prices, travelMode, inclusions, availability);
try {
    const result = await AgenttravelpackageModel.findByIdAndUpdate(
      updated_id,
      { package_status: nextStatus },
      { newupdated: true } // return the updated document
    );

    if (!result) {
      console.log('Agent Package Data not found');
    } else {
      console.log('Updated agent Package data:', result);
    }
  } catch (error) {
    console.error('Error updating agent Package data:', error);
  }

}

const getagentslist =async (req,res)=>{
  try{
          const agentslist = await UserModel.find({userrole: "agentrole"}).sort({submittedAt:-1});
          // console.log(packages);
          // const isPassEqual = await bcrypt.compare(password,existingUser.password);
          res.status(200).json(agentslist);
          }catch(error){
              res.status(500).json({message:error});
          }
}



const updateagentslist=async (req, res) => {
  const updates = req.body; // Expecting an array of users with _id and new status
// console.log(req.body,"<-----------updatetravelpackages");
const {updated_id, nextStatus }=req.body;
// console.log( title,destinations,duration ,description, prices, travelMode, inclusions, availability);
try {
    const result = await UserModel.findByIdAndUpdate(
      updated_id,
      { agentStatus: nextStatus },
      { newupdated: true } // return the updated document
    );

    if (!result) {
      console.log('Agent Data not found');
    } else {
      console.log('Updated agent data:', result);
    }
  } catch (error) {
    console.error('Error updating agent data:', error);
  }

}

const sendleadstoagent=async (req, res) => {
  const updates = req.body; // Expecting an array of users with _id and new status
console.log(req.body,"<-----------updatetravelpackages");
const {AgentName,AllSelectedData }=req.body;
// console.log( title,destinations,duration ,description, prices, travelMode, inclusions, availability);
console.log(AgentName,AllSelectedData,"<-------------req.body")
try {
  const bulkOps = AllSelectedData.map((id,index) => ({
      updateOne: {
        filter: { _id: id },
        // update: { agentassigned: agentassigned.push(AgentName) }
        update: { $addToSet: { agentassigned: AgentName } }

      }
    }));

    const result = await EnquiryModel.bulkWrite(bulkOps);

    // const result = await EnquiryModel.findByIdAndUpdate(
    //   AllSelectedData,
    //   { agentassigned: AgentName },
    //   { newupdated: true } // return the updated document
    // );



    if (!result) {
      console.log('Lead Data not found');
    } else {
      // console.log('Assigned Lead to agent', result);
      res.status(200).json({message:"Assigned Lead Successfully"});
    }
  } catch (error) {
    console.error('Error assigning leads:', error);
  }

}


const removeleadsfromagent=async (req, res) => {
  const updates = req.body; // Expecting an array of users with _id and new status
console.log(req.body,"<-----------updatetravelpackages");
const {AgentName,AllSelectedData }=req.body;
// console.log( title,destinations,duration ,description, prices, travelMode, inclusions, availability);
console.log(AgentName,AllSelectedData,"<-------------req.body")
try {
  const bulkOps = AllSelectedData.map((id,index) => ({
      updateOne: {
        filter: { _id: id },
        // update: { agentassigned: agentassigned.push(AgentName) }
        update: { $pull: { agentassigned: AgentName } }

      }
    }));

    const result = await EnquiryModel.bulkWrite(bulkOps);

    // const result = await EnquiryModel.findByIdAndUpdate(
    //   AllSelectedData,
    //   { agentassigned: AgentName },
    //   { newupdated: true } // return the updated document
    // );



    if (!result) {
      console.log('Lead Data not found');
    } else {
      // console.log('Assigned Lead to agent', result);
      res.status(200).json({message:"Assigned Lead Successfully"});
    }
  } catch (error) {
    console.error('Error assigning leads:', error);
  }

}

module.exports = {removeleadsfromagent, sendleadstoagent, updateagentslist, travelpackages,getadmintravelpackages,getAllEnquiry,updatetravelpackages,agenttravelpackages, getagentslist};