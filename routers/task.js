const express=require('express');
const router=express.Router();
const {createTask, updateTask,deleteTaskbyid,getTaskbyuser,getTaskById}=require('../controllers/taskController.js');

router.post("/",createTask);

router.put("/:id",updateTask);

router.delete("/:id", deleteTaskbyid);

router.get("/getbyuserid", getTaskbyuser);

router.get("/:id", getTaskById);




module.exports=router;