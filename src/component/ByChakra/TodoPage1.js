
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

import { Stack, Heading, Text, Input, Button,  HStack, Center } from '@chakra-ui/react';
import TableChakra from './TableChakra';
import axios from 'axios';







function TodoPage() {
	const [toDo, setToDo] = useState([]);
	const [isGetData, setIsGetData] = useState(false);
	const [filtreTask, setFiltreTask] = useState([]);
	const [query, setQuery] = useState('')
	const [selectedTasks, setSelectedTasks] = useState([]);

	// Temp state 
	const [newTask, setNewTask] = useState('');
	const [updateData, setUpdateData] = useState({});

	// search
	const handelSerarch = (e) => {
		const getSearch = e.target.value;

		setQuery(getSearch);

		if (getSearch.length > 0) {
			const searchtask = toDo?.filter((item) => item.title.toLowerCase().includes(getSearch.toLowerCase()));
			setToDo(searchtask);
		}
		else {
			getTasks()
		}
	}

	const selectTasks = (itemId) => {
		setSelectedTasks((prevSelectedTasks) => {
			return prevSelectedTasks.includes(itemId)
				? prevSelectedTasks.filter((id) => id !== itemId) : [...prevSelectedTasks, itemId]
		});

	};
	// delete multiple task
	const deleteSelectedTasks = () => {
		
		
        console.log(JSON.stringify(selectedTasks),"sselect")
		axios.delete('http://localhost:8080/delete-multiple-Todo',{ data: { arrayid: selectedTasks}})
		.then(response => {
			selectedTasks.map((id)=>{
				let newTasks = toDo.filter(task => task._id !== id)
				setToDo(newTasks);
			})

		  })
		  .catch(error => {
			console.error( error);
		  });
	
	};



	// get tasks
	const getTasks = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch('http://localhost:8080/get-todo', requestOptions)
			.then(async response => {
				const res = await response.json()
				setToDo([...res?.toDoList])
				setFiltreTask([...res?.toDoList])

				setIsGetData(true)
			})
	}
	useEffect(() => {
		getTasks()
	}, [isGetData]);



	// Add task 
	const addTask = () => {

		if (newTask) {
			let newEntry = { title: newTask, status: false }
			console.log(newEntry,'add task')
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newEntry)
			};
			fetch(`http://localhost:8080/add-todo`, requestOptions).then(async response => {
				const res = await response.json()
				console.log(res,"result")

				setToDo([...toDo, { id: res?.ToDoList._id, title: res?.ToDoList.title, status: res?.ToDoList.status }])

				setIsGetData(true)
			})
			setNewTask('');}}


	//delete task 
	const deleteTask = (id) => {

		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },

			body: JSON.stringify({ id: id })
		}
		fetch('http://localhost:8080/delete-todo', requestOptions).then(()=>{
			let newTask = toDo.filter(task => task._id !== id)
			setToDo(newTask);

		})
	}

	


	// task done or completed 
	const markDone = (id) => {
		let newTask = toDo?.map(task => {
			if (task._id === id) {
				return ({ ...task, status: !task.status })
			}
			return task;

		})
		setToDo(newTask)
	}
	// cancel update
	const CancelUpdate = () => {
		setUpdateData('');
	}
	// change Task fo update
	const changeTask = (e) => {
		let newEntry = {
			id: updateData?.id,
			title: e.target.value,
			status: updateData.status ? true : false,
		}
		setUpdateData(newEntry);
	}
	//Update task 
	const UpdateTask = (e) => {
		let filterRacods = [...toDo].filter(task => task._id !== updateData.id);
		let updateObject = [...filterRacods, updateData];

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: updateData.id, title: updateData.title, status: updateData.status })
		};
		fetch(`http://localhost:8080/update-todo`, requestOptions)
		setToDo(updateObject);
		setUpdateData('');


	}

	return (

		<Stack p={10}>
			<Stack >
				<Stack className="Title  ">
					<Heading className="SubTitle1">Welcome back!</Heading>
					<Text fontSize={{ base: "18px", md: "20px", lg: "26px" }} >
						Here's a list of your tasks for this month!
					</Text>
				</Stack>
				<HStack >
					<Input
						w={250}
						border='1px'
						borderColor='#E2E8F0'
						placeholder='filter tasks ...'
						onChange={(e) => handelSerarch(e)} value={query} />


					<Button
						gap={2}
						w={110}
						border='1px'
						borderColor='#E2E8F0'
						bg={'white'}>
						<Stack >
							<IoIosAddCircleOutline size={20} />
						</Stack>
						status
					</Button>
					<Button
						gap={2}
						w={110}
						border='1px'
						borderColor='#E2E8F0'
						bg={'white'}>
						<Stack >
							<IoIosAddCircleOutline size={20} />
						</Stack>
						Priority
					</Button>
				</HStack>
			</Stack>
			<Center py={8}>

				{updateData.title && updateData ? (
					<>
						<HStack >
							<Stack >
								<Input value={updateData && updateData.title}
									onChange={(e) => changeTask(e)} />
							</Stack>
							<HStack >
								<Button
									bg={'#ECC94B'}
									_hover={{ bg: '#F6E05E' }}
									onClick={UpdateTask}
									className='btn btn-lg btn-success mr-20'>Upadate</Button>
								<Button
									bg={'#F56565 '}
									_hover={{ bg: '#FC8181' }}
									onClick={CancelUpdate} className='btn btn-lg btn-warning'> Cancel</Button>

							</HStack>
						</HStack>


					</>

				) : (
					<>
						<HStack >
							<Stack  >
								<Input

									value={newTask}
									onChange={(e) => setNewTask(e.target.value)} />

							</Stack>
							<Stack className='col-auto'>
								<Button
									onClick={addTask}
									bg={'#48BB78 '}
									_hover={{ bg: '#68D391' }} >
									Add Task
								</Button>
							</Stack>
						</HStack>

					</>
				)}
				{toDo && toDo.length ? '' : 'No thanks...'}
				
				{/* {toDo && toDo?.map ((task, index) => {
        return(
         
          <React.Fragment key={task._id}>
            <Stack className=' col taskBg'>
              <Stack className={ task.status ? 'done' : ''}>
                
                <span className='taskNumber'   >{"Task-" + (index + 1) }</span>
                <span className='taskText'>{task.title}</span>
              </Stack>
              <Stack className='iconsWrap'>
                <span title="completed / Not Completed"
                onClick={ (e) => markDone(task._id)}
                > 
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {task.status ? null : (
                  <span title="Edit"
                  onClick={( )=> setUpdateData({
                     id: task._id,
                     title: task.title,
                     stauts: task.status ? true : false
                     })}>
                  <FontAwesomeIcon icon={faPen}/>
                </span>

                )}
                
                <span title='Delete' 
                onClick={() => deleteTask(task._id)}>
                <FontAwesomeIcon icon={ faTrashCan}/>
                </span>
              </Stack>

            </Stack>
           
          </React.Fragment>
        )
      })} */}


			</Center>
			<TableChakra toDo={toDo} selectTasks={selectTasks} markDone={markDone} setUpdateData={setUpdateData} deleteTask={deleteTask}/>
			<Stack>
				<Button
				
			
					bg={"#E53E3E"}
					w={"fit-content"}
					_hover={{ bg: '#F56565' }}
					
					hidden={selectedTasks.length > 0 ? false : true}
					// disabled={selectedTasks.length > 0 ? false : true}
					onClick={
						deleteSelectedTasks
						// () => console.log("test")
						}>
						{/* <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
						Delete All Selected
                        </Text> */}
						Delete All Selected
				</Button>

			</Stack>


		</Stack>
	);
}

export default TodoPage;
