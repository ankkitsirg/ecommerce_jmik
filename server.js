const express=require('express');
const cors =require('cors');
const objofconnection=require('./config/db');//receiving connection object
const objofserver=express();

//permissions
objofserver.use(cors());
objofserver.use(express.json())


//creating endpoints

//Get METHOD
objofserver.get('/home',(objofreq,objofres)=>{ 
    objofres.send("Welcome To Express");
 })

//post Method 
objofserver.post('/saveusers',(objofreq,objofres)=>{ 
    //collect the data from requset / frontend / postman
    
 })

//listen at port number 5000
objofserver.listen(5000,()=>{ console.log("Welcome to Express at Port 5000")  })