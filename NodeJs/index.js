var Express = require('express');
require('dotenv').config();
var main = Express();
const Task = require("./models/addTask");
const dbcon = require("./config/dbCon");
const user = require("./models/user");
const Port = process.env.Port || 3000; // Default port if not set in .env
const cors = require("cors");

// Middleware
main.use(cors());
main.use(Express.json());

// Database Connection
dbcon();

// Routes

// Root Route
main.get("/", (req, res) => {
    res.send("Welcome to my website");
});

// Fetch Task Details
main.get("/getTaskDetails", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks); // Send tasks with 200 OK status
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ message: "Failed to fetch tasks. Please try again later." });
    }
});

// Add a Task
main.post("/addTask", async (req, res) => {
    try {
        const task = new Task(req.body);
        const result = await task.save();
        res.status(201).json(result); // Send success response with 201 Created status
    } catch (error) {
        console.error("Error adding task:", error.message);
        res.status(500).json({ message: "Failed to add task. Please try again later." });
    }
});

// User Login or Registration
main.post("/signup", async (req, res) => {
    try {
        const userData = new user(req.body);
        const result = await userData.save();
        const modresult = result.toObject();
        delete modresult.password;
        res.status(201).json(modresult); // Send success response
    } catch (error) {
        console.error("Error in /login route:", error.message);
        res.status(500).json({ message: "Failed to save user data. Please try again later." });
    }
});

main.post("/login", async (req,res)=>{
    try{
        const resultdata = await user.findOne(req.body).select('-password');
        if (resultdata){
            res.send(resultdata)
        }
        else{
            res.send({error:"invalid credentilas"});
        }
    }catch(error){
    }
});


// Global Error Handling Middleware
main.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.message);
    res.status(500).json({ message: "Internal Server Error. Please try again later." });
});

// Start Server
main.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
});