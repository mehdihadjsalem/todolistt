import React from 'react'

import { TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
 } from '@chakra-ui/react'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan, 
} from '@fortawesome/free-solid-svg-icons'

const TableChakra = ({toDo, selectTasks, markDone, setUpdateData, deleteTask}) => {
  console.log(toDo,"todo")
  return (
    <Box>
      <TableContainer boxShadow='base'>
  <Table variant='simple' >
   
    <Thead>
      <Tr>
        <Th></Th>
        <Th>Task</Th>
        <Th >Title</Th>
        <Th >status</Th>
        <Th >Priority</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {toDo && toDo?.map ((task, index) => {
            
      return(
      <Tr key={index}>
        <Td> <input
                      type="checkbox"
                      onChange={() => {
                        selectTasks(task._id) 
                     }
                      }/>
                      {toDo.task}</Td>
        <Td> Task- {String(index + 1) }</Td>
        <Td >{task.title}</Td>
        <Td >{String(task?.status)}</Td>
        <Td > <Text>Medium</Text></Td>
        <Td >
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
        </Td>
      </Tr>
       ) })}
    </Tbody>
    
  </Table >
</TableContainer>



    </Box>
  )
}

export default TableChakra