const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./models/todoSchema');
const PORT = 8080;
const URI='**********************************************************'

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(URI);

mongoose.connection.on('connected',()=>console.log("database connnect successfully..."));  
mongoose.connection.on('error',(err)=>console.log(err))

app.post('/api/addtodo',async(req,res)=>{  
    try {
    const {todo} = req.body;
    console.log(todo);

    const obj = {
        todo,
    }
    await todoModel.create(obj)

    res.json({
        message:"successfully create",
        status:true,
        data:obj
    })
    } catch (error) {
        res.json({
            message:`internal error occur ${error}`,
            status:false,
            data:null
        })
    }
});

app.get('/api/gettodo',async(req,res)=>{
    try {
        const getTodo = await todoModel.find({});
        res.status(200).json({
        message:"successfully get",
        status:true,
        data:getTodo
    })
    } catch (error) {
        res.status(500).json({
            message:`internal error occur ${error}`,
            status:false,
            data:null
        })
    }

})

app.delete('/api/deletetodo/:id',async (req,res)=>{
    try {
        const {id} = req.params;

    await todoModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"successfully delete",
        status:true,
    })
    } catch (error) {
        res.status(500).json({
            message:`internal error occur ${error}`,
            status:false,
        })
    }

})

app.put('/api/updatetodo',async (req,res)=>{
    try {
        const {todo,id}= req.body;

        console.log(todo,id);

     let obj = {
        todo:todo
     }

    await todoModel.findByIdAndUpdate(id,obj)
    res.status(200).json({
        message:"successfully update",
        status:true,
    })
    } catch (error) {
        res.status(500).json({
            message:`internal error occur ${error}`,
            status:false,
        })
    }

})

app.listen(PORT,()=>{
console.log(`server is running on http://localhost:${PORT}`)
})
