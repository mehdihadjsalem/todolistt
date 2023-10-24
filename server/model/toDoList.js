const mongoose = require('mongoose')

const toDoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
)

const ToDoList = mongoose.model('ToDoList', toDoListSchema)

module.exports = ToDoList;