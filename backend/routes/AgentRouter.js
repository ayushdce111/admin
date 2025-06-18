
const {travelpackages,getAgenttravelpackages} = require("../controllers/AgentController.js");
const router = require("express").Router();

router.post("/api/travelpackages",travelpackages);
router.get("/api/travelpackages",getAgenttravelpackages);
// router.post("/api/updatetravelpackages",upAgenttravelpackages);
// router.get("/api/enquiry",getAllEnquiry);

module.exports = router;
