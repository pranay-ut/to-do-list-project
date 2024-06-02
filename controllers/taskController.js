const {writeFile,readFile }=require('fs/promises')
let taskData=[]
let userData=[]

const readUsers=async()=>{
    try{
        const users=await readFile("./user.txt","utf-8")
        userData=JSON.parse(users);

    }
    catch(err){
        console.log("error:", err)

    }
}

const createTask=async(req,res)=>{
    const{title,description,userId}=req.body;
    let userID=parseInt(userId)
    await readUsers();

    const user=userData.find((user)=>user.id===userID);
    

    if(!user){
        return res.status(404).json({error:"user not found"});
    }
    const newtask={id:taskData[taskData.length-1].id+1,title,description,userId};
    taskData.push(newtask);
    await writeTasks();
    res.status(201).json(newtask)
}
const readTasks=async()=>{
    try{
        // await writeFile("./task.txt",JSON.stringify(taskData));
        const tasks=await readFile("./task.txt","utf-8")
        console.log("tasks:", tasks);
        taskData=JSON.parse(tasks);

    }
    catch(err){
        console.log("error:", err)

    }
}

const writeTasks=async()=>{
    try{
        await writeFile("./task.txt",JSON.stringify(taskData));
    }
    catch(err){
        console.log("error:", err)

    }
}

// const appendTasks=async()=>{
//     try{
//         await appendFile("./task.txt",JSON.stringify(taskData));
//     }
//     catch(err){
//         console.log("error:", err)

//     }
// }



const updateTask = async (req, res) => {
    const { title, description, userId } = req.body;
    const {id}=req.params;
    let userID = parseInt(userId);
    let taskID = parseInt(id);
    await readUsers();

    const user = userData.find((user) => user.id === userID);

    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }

    // await readTasks();

    
    const taskIndex = taskData.findIndex((task) => task.id === taskID);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: "task not found" });
    }

    if(taskData[taskIndex].userId!==userId && userID!==process.env.ADMIN_ID){
        return res.status(403).json({ error: "unauthorized access" });
            
    }

    taskData[taskIndex] = { ...taskData[taskIndex], title, description };
    await writeTasks();
    res.status(200).json(taskData[taskIndex]);
};

const deleteTaskbyid= async(req,res)=>{
    const { userId} = req.body;
    const {id}=req.params;
    let userID = parseInt(userId);
    let taskID = parseInt(id);
    await readUsers();

    const user = userData.find((user) => user.id === userID);

    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }

    // await readTasks();
    
    const taskIndex = taskData.findIndex((task) => task.id === taskID);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: "task not found" });
    }

    if(taskData[taskIndex].userId!==userId && userID!==process.env.ADMIN_ID){
        return res.status(403).json({ error: "unauthorized access" });
            
    }

    
    taskData.splice(taskIndex, 1);
    await writeTasks();
    res.status(200).json({ message: "task deleted successfully" });
}

const getTaskbyuser=async(req,res)=>{
    const{userId}=req.body;
    let userID = parseInt(userId);
    await readUsers();

    const user = userData.find((user) => user.id === userID);

    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }

    if(user.id===process.env.ADMIN_ID){
        return res.status(200).json(taskData);

    }

    // await readTasks();

    const userTasks = taskData.filter((task) => task.userId === userId);

    res.status(200).json(userTasks);

}

const getTaskById=async(req,res)=>{
    const{id}=req.params;
    // let userID = parseInt(userId);
    // await readUsers();

    // const user = userData.find((user) => user.id === userID);

    // if (!user) {
    //     return res.status(404).json({ error: "user not found" });
    // }

    // await readTasks();

    

    const task = taskData.filter((task) => task.id === parseInt(id));

    res.status(200).json(task);

}



module.exports={readTasks,writeTasks,createTask,updateTask,deleteTaskbyid,getTaskbyuser,getTaskById}