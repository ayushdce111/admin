
const {travelpackages,getAlltravelpackages} = require("../controllers/AdminController.js");
const router = require("express").Router();

router.post("/api/travelpackages",travelpackages);
router.get("/api/travelpackages",getAlltravelpackages);

module.exports = router;
