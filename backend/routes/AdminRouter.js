
const {travelpackages,getAlltravelpackages,getAllEnquiry} = require("../controllers/AdminController.js");
const router = require("express").Router();

router.post("/api/travelpackages",travelpackages);
router.get("/api/travelpackages",getAlltravelpackages);
router.get("/api/enquiry",getAllEnquiry);

module.exports = router;
