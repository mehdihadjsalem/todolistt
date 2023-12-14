// Module

const mongoose = require('mongoose');
const {schema, resolvers} = require('./model/graphQl.js')
const express = require('express');
const ToDoListModel = require('./model/toDoList');
const {} = require('graphql')
const { graphqlHTTP} = require ( 'express-graphql');

var bodyParser = require('body-parser')
var cors = require('cors');

const app = express();
 app.use(express.json());

 
 async function run() {
  await mongoose.connect('mongodb://localhost:27017/toDoList')
}
run()
 app.use(bodyParser.json({ limit: "50mb", extended: false }));
 app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
 app.use(cors())

 app.use( '/graphql',graphqlHTTP({schema,rootValue:resolvers,graphiql:true}))
 // 
app.get( "/get-todo", async (req, res ) => { 
  const toDoList = await ToDoListModel.find()
  if(!toDoList){
    res.status(200).json({message: "Empty list."})
  }
  res.status(200).json({toDoList})
} )

// app.post("/add-todo", async (req, res) => { 
//   // console.log(req.body)
 
//   const ToDoList = new ToDoListModel({...req.body})
//   try {
//     await ToDoList.save();
//     res.status(200).json({ ToDoList, message: "success" });
//   }
//   catch(err) {
//     console.log(err)
//   }
// })


// app.put("/update-todo", async (req, res) => {
 
//   const id = req.body.id;
//  try {
//       const todo = await ToDoListModel.updateOne({ _id: id}, { $set: {title: req.body.title, status: req.body.status}});
//       res.status(200).json({ ToDoListModel, message: "success" });
// } catch (error) {
//       res.status(500).json(error);
//   }
//   });



  app.delete("/delete-multiple-Todo", async (req, res) => {
    const arrayid = req.body.arrayid;
    let arrayToDelete
    try{
      arrayid?.map(async(id) => {
        arrayToDelete = await ToDoListModel.findByIdAndDelete({_id:id})
       })

      return res.status(200).json("Succ deleted.")
    }catch(err){
      console.log(err)
      return res.json(err)
  
    }
    
  
    
   
  })

// app.delete("/delete-todo", async (req, res) => {
//   const id = req.body.id;
//   ToDoListModel.findByIdAndDelete({_id: id})
//   .then(res => res.status(200).json(res))

//   .catch(err => res.json(err))
 
// })




 app.listen(8080, () => {
  console.log("server running on port 8080...")
 })
