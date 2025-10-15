const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    console.log("I'm a GET request");
    res.send("Hello World from contact page");
});

router.post("/",(req,res)=>{
    console.log("I'm a POST request");
    res.send("Hello World from contact page - POST");
});

module.exports=router;