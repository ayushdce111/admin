const express = require("express");
const app = express();
require('dotenv').config();
require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
// const ProductRouter = require("./routes/ProductRouter-ForDEMO");
const AdminRouter = require("./routes/AdminRouter");
const AgentRouter = require("./routes/AgentRouter");

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth",AuthRouter);
// app.use("/products",ProductRouter);
app.use("/admin",AdminRouter);
app.use("/agent",AgentRouter);

app.get("/",(req,res)=>{
    console.log("hi");
    res.send("Hello World");
})

app.listen(PORT,()=>{console.log(`server running at ${PORT}`)});