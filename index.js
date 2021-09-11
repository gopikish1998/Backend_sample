const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = "mongodb+srv://gopi:gopi123@cluster0.85u0c.mongodb.net?retryWrites=true&w=majority"
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"*"
}))
app.use(express.json());

// let tasks = [];

app.get("/list-all-todo",async function(req,res){
    try {
        let client=await mongoClient.connect(url);//connect db
        let db=client.db("todo_app");//select db
        let data = await db.collection("tasks").find().toArray();//select collection and perform action
        await client.close()//close the connection
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })}
    // res.json(tasks)
})

app.post("/create-task",async function(req,res){
    try {
        let client=await mongoClient.connect(url);//connect db
        let db=client.db("todo_app");//select db
        let data = await db.collection("tasks").insertOne(req.body)//select collection and perform action
        await client.close()//close the connection
        res.json({
            message:"task created"
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
    // console.log(req.body)
    // req.body.id = tasks.length+1;
    // req.body.date = new Date();
    // req.body.status=false;
    // tasks.push(req.body)
    // res.json({
    //     message:"Task Created Successfully"
    // })
})

app.put('/update-task/:id', async (req, res) => {
    try {
        let client=await mongoClient.connect(url);//connect db
        let db=client.db("todo_app");//select db
        let data = await db.collection("tasks").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
        await client.close()//close the connection
        res.json({
            message:"task updated"
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
    }
//     let selectTask = tasks.findIndex(obj=>obj.id==req.params.id)
//     console.log(selectTask)
//     if(selectTask!=-1){
//         tasks[selectTask].status=req.body.status;
//         res.json({
//             message:"successful"
//         })
//     }
//     else{
//         res.json({
//             message:"Not found"
//         })
//     }
  })
app.delete('/delete-task/:id',async (req,res)=>{
    try {
        let client=await mongoClient.connect(url);//connect db
        let db=client.db("todo_app");//select db
        let data = await db.collection("tasks").deleteOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
        await client.close()//close the connection
        res.json({
            message:"task deleted"
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
    }
    // let selectTask = tasks.findIndex(obj=>obj.id==req.params.id)
    // // console.log(selectTask)
    // if(selectTask!=-1){
    //     tasks.splice(selectTask,1)
    //     res.json({
    //         message:"Deleted"
    //     })
    // }
    // else{
    //     res.json({
    //         message:"Not found"
    //     })
    // }
})

  // app.put("update-task/:id",function(req,res){
//     let selectTask = tasks.findIndex(obj=>obj.id==req.params.id)
//     console.log(selectTask)
//     if(selectTask!=-1){
//         tasks[selectTask].status=req.body.status;
//         res.json({
//             message:"successful"
//         })
//     }
//     else{
//         res.status(400).json({
//             message:"Task Not found"
//         })
//     }
// })

app.listen(PORT,function(){
    console.log(`The app is listening in the port ${PORT}`)
})