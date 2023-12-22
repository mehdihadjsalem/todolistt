import React from 'react'
import { Stack, useBreakpointValue } from '@chakra-ui/react'

import {
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  HStack,
  chakra
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

const TableChakra = ({ toDo, selectTasks, markDone, setUpdateData, deleteTask }) => {
  console.log(toDo, "todo")

  const isDesktop = useBreakpointValue({ base: false, md: true, lg: true })

  return (
    <Box  >
      {isDesktop ?
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
              {toDo && toDo?.map((task, index) => {

                return (
                  <Tr key={index}>
                    <Td> <input
                      type="checkbox"
                      onChange={() => {
                        selectTasks(task._id)
                      }
                      } />
                      {toDo.task}</Td>
                    <Td> Task- {String(index + 1)}</Td>
                    <Td >{task.title}</Td>
                    <Td >{String(task?.status)}</Td>
                    <Td > <Text>Medium</Text></Td>
                    <Td >
                      <chakra.span title="completed / Not Completed"
                        onClick={(e) => markDone(task._id)} sx={{
                          "#icon-fa": {
                            color: "#68D391"
                          }
                        }} >
                        <FontAwesomeIcon icon={faCircleCheck} id='icon-fa' />
                      </chakra.span>
                      {task.status ? null : (
                        <chakra.span title="Edit"
                          onClick={() => setUpdateData({
                            id: task._id,
                            title: task.title,
                            stauts: task.status ? true : false
                          })} sx={{
                            "#icon-fa": {
                              color: "#F6E05E"
                            }
                          }} >
                          <FontAwesomeIcon icon={faPen} id='icon-fa' />
                        </chakra.span>
                      )}

                      <chakra.span title='Delete'
                        onClick={() => deleteTask(task._id)} sx={{
                          "#icon-fa": {
                            color: "red"
                          }
                        }} >
                        <FontAwesomeIcon icon={faTrashCan} id='icon-fa' />
                      </chakra.span>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table >
        </TableContainer> :


        <Stack

        >
          {toDo && toDo?.map((task, index) => {

            return (
              <Stack
                w={80}
                bg={'white'}
                boxShadow='lg'
                p={7}
                mt={4}>
                <Stack mr={"auto"} >
                  <input
                    type="checkbox"
                    onChange={() => {
                      selectTasks(task._id)
                    }
                    } />
                  {toDo.task}</Stack>

                <HStack w="fit-content" ml="auto" pb={5} >
                  <chakra.span title="completed / Not Completed"
                    onClick={(e) => markDone(task._id)} sx={{
                      "#icon-fa": {
                        color: "#68D391"
                      }
                    }}  >
                    <FontAwesomeIcon icon={faCircleCheck} id='icon-fa' />
                  </chakra.span>
                  {task.status ? null : (
                    <chakra.span title="Edit"
                      onClick={() => setUpdateData({
                        id: task._id,
                        title: task.title,
                        stauts: task.status ? true : false
                      })}
                      sx={{
                        "#icon-fa": {
                          color: "#F6E05E"
                        }
                      }}  >
                      <FontAwesomeIcon icon={faPen} id='icon-fa' />
                    </chakra.span>
                  )}
                  <chakra.span title='Delete'
                    onClick={() => deleteTask(task._id)} sx={{
                      "#icon-fa": {
                        color: "red"
                      }
                    }}  >
                    <FontAwesomeIcon icon={faTrashCan} color='red.500' id='icon-fa' />
                  </chakra.span>
                </HStack>
                <HStack
                  bg={'#F7FAFC'}
                  boxShadow='base'
                  borderRadius={5}
                  p={1}>
                  <Text
                    as='b'
                    w={"30%"}>
                    Task
                  </Text>
                  <Box
                    ml="auto"
                    w={"fit-content"}>
                    Task- {String(index + 1)}
                  </Box>
                </HStack>
                <HStack
                  borderRadius={5}
                  boxShadow='base'
                  bg={'#EDF2F7'}
                  p={1}>
                  <Text
                    as='b'
                    w={"30%"}>
                    Title
                  </Text>
                  <Box
                    ml="auto"
                    w={"fit-content"}>
                    {task.title}
                  </Box>
                </HStack>
                <HStack
                  bg={'#F7FAFC'}
                  borderRadius={5}
                  boxShadow='base'
                  p={1}>
                  <Text
                    as='b'
                    w={"30%"}>
                    Status
                  </Text>
                  <Box
                    ml="auto"
                    w={"fit-content"}>
                    {String(task?.status)}
                  </Box>
                </HStack>
                <HStack
                  p={1}
                  bg={'#EDF2F7'}
                  boxShadow='base'
                  borderRadius={5}>
                  <Text
                    as='b'
                    w={"30%"}>
                    Priority
                  </Text>
                  <Box
                    ml="auto"
                    w={"fit-content"}>
                    <Text>Medium</Text>
                  </Box>
                </HStack>
              </Stack>
            )
          })}
        </Stack>
      }

    </Box >
  )
}


export default TableChakra