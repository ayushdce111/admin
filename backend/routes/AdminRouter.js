
const {travelpackages,getadmintravelpackages,agenttravelpackages,getAllEnquiry,updatetravelpackages} = require("../controllers/AdminController.js");
const router = require("express").Router();

router.post("/api/travelpackages",travelpackages);
router.get("/api/admintravelpackages",getadmintravelpackages);
router.get("/api/agenttravelpackages",agenttravelpackages);
router.get("/api/enquiry",getAllEnquiry);
router.post("/api/updateagentpackages",updatetravelpackages);

module.exports = router;
