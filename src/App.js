
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
const[toDo, setToDo] = useState([]);
const[isGetData, setIsGetData] = useState(false);

// Temp state 
const[newTask, setNewTask] = useState ('');
const[updateData,setUpdateData] = useState ('');

// get tasks
const getTasks = ( ) => { 
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};
fetch('http://localhost:8080/get-todo', requestOptions)
    .then(async response =>  {
      const res = await response.json()
      setToDo([...res?.toDoList])
      setIsGetData(true)
    })    
}
useEffect(() => {
  getTasks()
},[isGetData]);


// Add task 
const addTask = ()  => {


if (newTask) { 
  let newEntry = { title: newTask, status: false }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title: newEntry.title, status: newEntry.status})
};
fetch(`http://localhost:8080/add-todo`, requestOptions).then(async response =>  {
  const res = await response.json()
  // console.log(res.ToDoList,'add task')

    setToDo([...toDo,{id: res?.ToDoList._id, title:res?.ToDoList.title, status: res?.ToDoList.status}])

  setIsGetData(true)
})  
  setNewTask('');
}
}

//delete task 
const deleteTask = (id) => {
let newTask = toDo.filter( task => task._id !== id)
console.log(newTask, "tesk")
console.log(id, "id")

const requestOptions = {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },

  body: JSON.stringify({id:id})}
fetch('http://localhost:8080/delete-todo', requestOptions)

 setToDo(newTask);
// console.log(newTask.filter, 'delet')
 }

// task done or completed 
const markDone = (id) => {
  let newTask = toDo?.map(task => {
    if( task._id === id) {
      return({...task, status: !task.status})
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
    id:updateData.id,
    title:e.target.value,
    status:updateData.status ? true : false,
   }
   setUpdateData(newEntry);
}
//Update task 
const UpdateTask = (e) => {
  let filterRacods = [ ...toDo].filter(task => task._id !== updateData.id);
  let updateObject = [ ...filterRacods, updateData];

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id: updateData.id, title: updateData.title, status: updateData.status})
};
fetch(`http://localhost:8080/update-todo`, requestOptions)
  setToDo(updateObject);
  setUpdateData('');
  

}

  return (
    <div className="container App">
      <br></br>
      <h1>To Do list</h1>
      <br></br>
      {updateData && updateData ? ( 
        <>
        <div className='row'>
        <div className='col'>
          <input value= { updateData && updateData.title } 
        onChange={(e) => changeTask(e)} className='form-control form-control-lg'/>
        </div>
        <div className=' col-auto'>
          <button onClick={UpdateTask} 
          className='btn btn-lg btn-success mr-20'>Upadate</button>
          <button onClick={CancelUpdate} className='btn btn-lg btn-warning'> Cancel</button>

        </div>
      </div>


        </>

      ) : ( 
        <>
         <div className='row'>
        <div className='col'>
          <input value={newTask}
          onChange={(e) => setNewTask(e.target.value)} className='form-control form-control-lg'/>

        </div>
        <div className='col-auto'>
          <button onClick={addTask} className='btn btn-lg btn-success' >
            Add Task 
          </button>
        </div>
      </div>
        
        </>

      )}
      
     
      {toDo && toDo.length ? '' : 'No thanks...'}
      {toDo && toDo?.map ((task, index) => {
        return(
          <React.Fragment key={task._id}>
            <div className=' col taskBg'>
              <div className={ task.status ? 'done' : ''}>
                <span className='taskNumber'>{index + 1 }</span>
                <span className='taskText'>{task.title}</span>
              </div>
              <div className='iconsWrap'>
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
              </div>

            </div>
           
          </React.Fragment>
        )
      })}
    
    </div>
  );
  }

export default App;
