const UserModel = require("../models/AllUser.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { name, email, password,userrole } = req.body;
        // console.log(name, email, password,userrole,"signup COntroller");
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        
        const agentStatus = "";

        const user = new UserModel({ name, email, password, userrole, agentStatus });
        user.password = await bcrypt.hash(password, 10);
        // console.log(user,"<-------------user.userRole--",user.userrole)
        // STARTS : for agent status
        
        if(userrole==="agentrole"){
            user.agentStatus = "Pending"
        }

        // ENDS : for agent status
        
        await user.save();
        res.status(201).json({ user, success: true, message: "Signup Success" });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ message: 'User Not Found', success: false });
        }
        
        const isPassEqual = await bcrypt.compare(password,existingUser.password);
        if(!isPassEqual){
            return res.status(403).json({ message: 'Invalid Password', success: false });
        }
        // STARTS : Agent Validation
        if(existingUser.userrole ==="agentrole"){
if(existingUser.agentStatus !== "Approved"){
            return res.status(403).json({ message: 'Verification Pending', success: false });
        }
        }
        

        // ENDS : Agent Validation
        const jwtToken = jwt.sign(
            
                {email:existingUser.email, _id:existingUser._id},
                process.env.JWT_Secret,
                {expiresIn:"24h"}
            
        )
        res.status(200).json({ existingUser, success: true, message: "LOGIN Success",jwtToken,email, name: existingUser.name });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports = {signup,login};


