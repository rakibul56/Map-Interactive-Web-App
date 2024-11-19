const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const user_route = require("../Server/Routes/user_route.js");
const test_route = require("../Server/Routes/test_route.js");
const map_route = require ("../Server/Routes/map_route.js")
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.urlencoded({extended: false}));

const uri = process.env.MONGODB_URI;


app.get("/",(req,res)=>{
    res.send("Welcome from your Local server")
})
app.use("/", user_route);
app.use("/", map_route);
app.use("/",test_route);

mongoose.connect(uri).then(res => {
    console.log('MongoDb DATABASE CONNECTED')
});
 

app.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON PORT 3001")
})