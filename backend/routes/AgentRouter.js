
const {buylead,getagentcredit, getagentassignedleads, travelpackages,getAgenttravelpackages} = require("../controllers/AgentController.js");
const router = require("express").Router();

router.post("/api/travelpackages",travelpackages);
router.get("/api/travelpackages",getAgenttravelpackages);
router.get("/api/allleads",getagentassignedleads);
router.get("/api/getagentcredit",getagentcredit);
router.post("/api/buylead",buylead);
// router.post("/api/updatecredittoagent",updatecredittoagent);



// router.post("/api/updatetravelpackages",upAgenttravelpackages);
// router.get("/api/enquiry",getAllEnquiry);

module.exports = router;
