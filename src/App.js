
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
const[toDo, setToDo] = useState([
  {"id": 1, "title": "task 1", "status": false },
  {"id": 2, "title": "task 2", "status": false },
]);
// Temp state 
const[newTask, setNewTask] = useState ('');
const[updateData,setUpdateData] = useState ('');

// Add task 
const addTask = ()  => {
if (newTask) { 
  let num = toDo.length + 1;
  let newEntry = {id: num, title: newTask, status: false }
  setToDo([...toDo, newEntry])
  setNewTask('');
}
}

//delete task 
const deleteTask = (id) => {
let newTask = toDo.filter(task => task.id !== id)
setToDo(newTask);
} 

// task done or completed 
const markDone = (id) => {
  let newTask = toDo.map(task => {
    if( task.id === id) {
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
  let filterRacods = [ ...toDo].filter(task => task.id !== updateData.id);
  let updateObject = [ ...filterRacods, updateData]
  setToDo(updateObject);
  setUpdateData('');

}

  return (
    <div className="App">
      <br></br>
      <h1>To Do list</h1>
      <br></br>
      <div>
        <div >
          <input value= { updateData && updateData.title } 
        onChange={(e) => changeTask(e)}/>
        </div>
        <div>
          <button onClick={UpdateTask}>Upadate</button>
          <button onClick={CancelUpdate}> Cancel</button>

        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <input value={newTask}
          onChange={(e) => setNewTask(e.target.value)}/>

        </div>
        <div className='col-auto'>
          <button onClick={addTask} >
            Add Task 
          </button>
        </div>
      </div>
      {toDo && toDo.length ? '' : 'No thanks...'}
      {toDo && toDo 
      .map ((task, index) => {
        return(
          <React.Fragment key={task.id}>
            <div className=' col tasking'>
              <div className={ task.satus ? 'done' : ''}>
                <span className='taskText'>{index + 1 }</span>
                <span className='taskText'>{task.title}</span>
              </div>
              <div>
                <span title="completed / Not Completed"
                onClick={ (e) => markDone(task.id)}
                > 
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {task.status ? null : (
                  <span title="Edit"
                  onClick={( )=> setUpdateData({
                     id: task.id,
                     title: task.title,
                     stauts: task.status ? true : false
                     })}>
                  <FontAwesomeIcon icon={faPen}/>
                </span>

                )}
                
                <span title='Delete' 
                onClick={() => deleteTask(task.id)}>
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
