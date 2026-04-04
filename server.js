const express=require('express');
const cors =require('cors');
const objofconnection=require('./config/db');//receiving connection object
const objofserver=express();

//permissions
objofserver.use(cors());
objofserver.use(express.json())


//creating endpoints

//Get METHOD
objofserver.get('/getusers',async (objofreq,objofres)=>{ 
   
     //step 1--->receive data from postman/frontend

     //step 2--->write query for table
     const result=await objofconnection.query("select * from users");// it is long time 

     //step 3-->send response to postman/frontend
     objofres.json({message:"Successfull",data:result.rows});

 })

//post Method 
objofserver.post('/saveusers',async (objofreq,objofres)=>{ 
    //collect the data from requset / frontend / postman
     //step 1--->receive data from postman/frontend
      const {name,email,password}=objofreq.body;

     //step 2--->write query for table
     //const result=await objofconnection.query("insert into users(name,email,password) values('"+name+"','"+email+"','"+password+"') returning *");//long time
      const result=await objofconnection.query("insert into users(name,email,password) values($1,$2,$3) returning *",[name,email,password]);//long time

     //step 3-->send response to postman/frontend
     objofres.json({message:"Inserted Successfully",data:result.rows[0]});
    
 })

//listen at port number 5000
objofserver.listen(5000,()=>{ console.log("Welcome to Express at Port 5000")  })