const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");
const User = require("./schema");
const app = express();
const port = 3010;

const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post("/api/users",async(req,res)=>{
  try {
    console.log(req.body)
    const{name,email,password}=req.body;
    if(!name || !email || !password){
      return res.status(400).send({message:"Validation error all field required"});
    }
    console.log(name,email,password)
    const newUser = new User({name,email,password});
    console.log(newUser);
    await newUser.save()
    return res.status(201).send({message:"User created successfully"});
  } catch (error) {
    return res.status(500).send({message:"Something went wrong"});
  }
})

app.listen(port, async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error) {
    console.log(`Error connecting to database`)
    console.log(error)
  }
});
