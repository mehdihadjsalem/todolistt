import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan, 
} from '@fortawesome/free-solid-svg-icons'

const TableBord = ({toDo, selectTasks, markDone, setUpdateData, deleteTask}) => {
  return (
    <table  className="display" >
    <thead>
          <tr>
              <th></th>
              <th>Task</th>
              <th>Title</th>
              <th>status</th>
              <th>Priority</th>
              <th>Action</th>
          </tr>
    </thead>
          <tbody className='tbody'>
          {toDo && toDo?.map ((task, index) => {
            
            // console.log(task.status, "stau")
      return(
            <tr className='colone' key={index}>
              <td>
             
                      <input 
                      type="checkbox"
                      onChange={() => {
                        selectTasks(task._id) 
                     }
                      }/>
                      {toDo.task}
                  
              </td>
              <td>
                 Task- {String(index + 1) }
              </td>
              <td>{task.title}</td>
              <td>{String(task?.status)}</td>
              <td>Medium</td>
              <td>
              <span title="completed / Not Completed"
              onClick={ (e) => markDone(task._id)}> 
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
              <FontAwesomeIcon icon={faTrashCan}/>
              </span>
              </td>
            </tr>
           ) })}
          </tbody>
    
  </table>
  )
}

export default TableBord