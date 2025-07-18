
const {updateadmintravelpackages, addCredittoAgent,removeleadsfromagent,sendleadstoagent,updateagentslist,getagentslist,travelpackages,getadmintravelpackages,agenttravelpackages,getAllEnquiry,updatetravelpackages} = require("../controllers/AdminController.js");
const router = require("express").Router();

router.post("/api/travelpackages",travelpackages);
router.put("/api/updateadmintravelpackages",updateadmintravelpackages);
router.get("/api/admintravelpackages",getadmintravelpackages);
router.get("/api/agenttravelpackages",agenttravelpackages);
router.get("/api/enquiry",getAllEnquiry);
router.post("/api/updateagentpackages",updatetravelpackages);
router.get("/api/agentslist",getagentslist);
router.post("/api/agentslist",updateagentslist);
router.post("/api/sendleadstoagent",sendleadstoagent);
router.post("/api/removeleadsfromagent",removeleadsfromagent);
router.post("/api/addcredittoagent",addCredittoAgent);


module.exports = router;
