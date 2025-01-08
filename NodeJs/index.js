var Express = require('express');
require('dotenv').config();
var main = Express();
const Task = require("./models/addTask");
const dbcon = require("./config/dbCon");
const Port=process.env.Port
const cors =require("cors");

main.use(cors());

main.get("/",(req,res)=>{
    res.send("Welcome to my website");
});

main.listen(Port);

dbcon(); 

main.get("/getTaskDetails",async (req,res)=>{
    try{
        res.json(await Task.find())
    }catch(error){
        console.log(error)
    }
}); 

main.use(Express.json());

main.post("/addTask", async (req,res)=>{
    var task = new Task(req.body)
    const result = await task.save();
    res.send(result);
});