const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
// const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const  registration  = require("./modal/schema")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const {createTokens, validateToken} = require("./jwt")
const app = express()

// app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors());
  
mongoose.connect("mongodb+srv://Guru:Guru777@cluster0.ke7v2.mongodb.net/pettycash?retryWrites=true&w=majority",() => {
    console.log("connected to db")
})



// register
app.post("/registration", async (req,res) => {
try{

  
     // generate new password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const register = new registration ({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    await register.save()
    res.send("resgistered succesfully")
}catch(err){
    console.log(err)
}
})


// Login
app.post("/login",async (req,res) => {
    try{
     const user = await registration.findOne({email:req.body.email})
     !user && res.status(404).send("user not found")
    
     const  pass = await bcrypt.compare( req.body.password, user.password)
     console.log(pass)
     !pass && res.status(400).json("Invalid credentials")
 console.log(user)
//  const accessToken = createTokens(user)

//  res.cookie("access-token",accessToken,{
//      maxAge: 60 * 60 * 24 * 30 * 1000,
//      httpOnly: true
//  })
     return res.status(200).json(user)
   
    }catch(err){
     res.status(500).json(err)
     // console.log(err)
    }
 })
 
 app.get("/login",validateToken,async(req,res) => {
    try{
        
       
        res.send("user")
    }catch(err){
        console.log(err)
    }
})



app.listen(process.env.PORT || 3000, () => {
    console.log("server is running")
})