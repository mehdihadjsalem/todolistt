
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

 type Mutation {
	addTask(title: String!, status: Boolean!): Task
	deleteTask(id: ID!): Boolean
	updateTask(id: ID!, title: String! , status: Boolean!): Boolean
 }
`)
const REQUIRED_FIELDS = "Required fields."
const resolvers = {
	Query: {
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
	},
	Mutation: {
		addTask: async (req, res) => {
			const title = res.title
			const status = res.status
			if(!title || !status){
				throw new GraphQLError(REQUIRED_FIELDS, {
					extensions: {
						code: 'FORBIDDEN',
					},
				});
			}
			try {
				const ToDoList = new ToDoListModel({ title , status })
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
		deleteTask:async (req, res) => {
			console.log(res,"delet" )
			const id = res.id;
			if (!id) {
				throw new GraphQLError("Required field.", {
					extensions: {
						code: 'FORBIDDEN',
					},
				});
			}

			const isExist = await ToDoListModel.findOne({_id:id})
			if(!isExist){
				throw new GraphQLError("This task is not exist.", {
					extensions: {
						code: 'FORBIDDEN',
					},
				});
			}
			try {
				await ToDoListModel.deleteOne({ _id: id })
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
			console.log(res,"upda" )

			const id = res.id;
			const title = res.title;
			const status = res.status
			if (!id || !title) {
				throw new GraphQLError(REQUIRED_FIELDS, {
					extensions: {
						code: 'FORBIDDEN',
					},
				});
			}
			try {
				const todo = await ToDoListModel.updateOne({ _id: id }, { $set: { title: title, status: status } });


				return true
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




}
module.exports = { schema, resolvers }


