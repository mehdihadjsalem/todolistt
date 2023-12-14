
const { buildSchema, GraphQLError } = require('graphql');
const ToDoListModel = require('./toDoList.js');



const schema = buildSchema(`
  type Task{
	id: String
	title: String
	status: Boolean

  }
  
  type Query {
	GetToDoList : [Task!]!

  }


 type mutation {
	addTask(title:String): Task
	deleteTask(id: ID!): Boolean
	updateTask(id: ID!, title: String! , Status: Boolean!): Task
	

 }
`)

const resolvers = {
	GetToDoList: async () => {
		const toDoList = await ToDoListModel.find()

		if (!toDoList) {
			throw new GraphQLError("You can not get the list.", {
				extensions: {
					code: 'FORBIDDEN',
				},
			});
		}

		return toDoList
	},

	addTask: async (req, res) => {

		const ToDoList = new ToDoListModel({ ...req.body })
		try {
			await ToDoList.save();
			return ToDoList
		}
		catch (err) {
			throw new GraphQLError("You can not add element in the list.", {
				extensions: {
					code: 'FORBIDDEN',
				},
			});
		}
	},
	deleteTask: (req, res) => {
		const id = req.body.id;
		if (!id) {
			throw new GraphQLError("Required field.", {
				extensions: {
					code: 'FORBIDDEN',
				},
			});
		}
		try {
			ToDoListModel.findByIdAndDelete({ _id: id })
			return true
		} catch (error) {
			console.log(error)
			throw new GraphQLError("You can not delete this element in the list.", {
				extensions: {
					code: 'FORBIDDEN',
				},
			});
		}

	},
	updateTask: async (req, res) => {
		const id = req.body.id;
		const title = req.body.title
		const status = req.body.status
		if (!id || !title) {
			throw new GraphQLError("Required fields.", {
				extensions: {
					code: 'FORBIDDEN',
				},
			});
		}
		try {
			const todo = await ToDoListModel.updateOne({ _id: id }, { $set: { title: title, status: status } });
			return todo
		} catch (error) {
			console.log(error)
			throw new GraphQLError("You can not update this element in the list.", {
				extensions: {
					code: 'FORBIDDEN',
				},
			});
		}
	}


}
module.exports = { schema, resolvers }


