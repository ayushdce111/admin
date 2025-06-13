const router = require("express").Router();


router.post("/api/travelpackages",EnsureAuthenticated,(req,res)=>{
    console.log(req.body.data) //to access user details without making db call everytime
    
    
});

module.exports = router;
