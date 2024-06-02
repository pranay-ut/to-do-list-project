const express=require('express');
const {writeFile,readFile }=require('fs/promises')
const authRouter=require('./routers/auth.js');
const taskRouter=require('./routers/task.js');
const {readUsers}=require('./controllers/authController.js')
const {readTasks}=require('./controllers/taskController.js')



const app=express();
app.use(express.json())   
require('dotenv').config()

const port=process.env.PORT


// let userData=[];

// const readUsers=async()=>{
//     try{
//         const users=await readFile("./user.txt","utf-8")
//         console.log("user data:", users);
//         userData=JSON.parse(users);

//     }
//     catch(err){
//         console.log("error:", err)

//     }
// }

// const writeUsers=async()=>{
//     try{
//         await writeFile("./user.txt",JSON.stringify(userData));
//     }
//     catch(err){
//         console.log("error:", err)

//     }
// }

// app.post('/api/auth/signup',async(req,res)=>{
//     const {username,password,email}=req.body;
//     try{
//     // await writeFile("./user.txt",JSON.stringify(userData));
//     // const users=await readFile("./user.txt","utf-8")
//     // console.log("user data:", users);
//     // userData=JSON.parse(users);

//     const user=userData.find((user)=>user.email===email);
//     if(user){
//         return res.status(404).json({error:"user already exists"});
//     }

//     const newPerson={id:userData.length+1,username,password,email};
    
//     userData.push(newPerson);
//     await writeUsers();

//     // await writeFile("./user.txt",JSON.stringify(userData));
    
//     res.status(201).json(newPerson);
//     }
//     catch(err){
//         res.status(400).json({error:err})
//     }

// })

// app.post('/api/auth/login',async(req,res)=>{
//     const{password,email}=req.body;

//     // const users=await readFile("./users.txt","utf-8");
//     // userdata=JSON.parse(users);

//     const user=userData.find((user)=>user.email===email);

//     if(!user){
//         return res.status(404).json({error:"user not found"});
//     }
//     if(user.password!==password){
//         return res.status(404).json({error:"Invalid Password!!"});
//     }

//     res.status(200).json({message:"login successfull"});
// })


app.use('/api/task',taskRouter)
app.use('/api/auth',authRouter)

app.listen(port,()=>{
    console.log("server is listening on 5000");
    readUsers();
    readTasks();

})


//user id,username,email,password-->user.txt