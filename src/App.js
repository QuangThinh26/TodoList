import './App.css';
import { useState, useEffect, useRef } from "react";

import { Input } from 'antd';
import { Select } from 'antd';
import { Row, Col } from 'antd';
import { List, Typography, Divider } from 'antd';
import { Modal, Button } from 'antd';
import { DatePicker, Space } from 'antd';
import { ConsoleSqlOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';




const defaultTaskData = {
  id: 0,
  content: "",
  date: "",
  status: "TO_DO",
};
function App() {

  const { Option } = Select;
  const [tasks, setTasks] = useState([]);
  const [ID, setID] = useState(0)
  const [newTask, setNewStask] = useState(defaultTaskData);
  const [isAddingTask, setisAddingTask] = useState(false);
  const [isEddingTask, setisEddingTask] = useState(false);
  const [editTask, setEditTask] = useState(defaultTaskData)
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } else { isMounted.current = true }
  }, [tasks])

  useEffect(() => {
    const localdatastring = localStorage.getItem('tasks') || "[]"
    const localdataarray = JSON.parse(localdatastring)
    setTasks(localdataarray)
  }, [])



  const handleAddingTask = () => {
    const newTaskData = { ...newTask, id: ID }
    setTasks([...tasks, newTaskData]);
    setNewStask(defaultTaskData);
    console.log(tasks.content)
    setID(ID + 1)
    setisAddingTask(false);
  };



  const handleEddingTask = () => {
    setTasks(tasks.map((task) => {
      if (task.id === editTask.id) {
        return editTask
      } else {
        return task
      }

    }))

    setisEddingTask(false)
  };

  const updateStatus = (id, newStatus) => setTasks(tasks.map(item => item.id === id ? { ...item, status: newStatus } : item))


  const deleteStatus = (id) => setTasks(tasks.filter(item => item.id !== id))


  const ediTask = (id) => {
    setisEddingTask(true)
    console.log(id)
    const taskdata = tasks.find(ele => ele.id === id)
    console.log(taskdata)
    setEditTask(taskdata)
  }
  return (
    <>
      <Button type="primary" onClick={() => setisAddingTask(true)}>
        Nhập Công Việc
      </Button>
      <Modal title="Tao Cong Viec" visible={isAddingTask} onOk={handleAddingTask} onCancel={() => setisAddingTask(false)}>

        <form>

          <Input
            placeholder="Content"
            type="text"
            value={newTask.content}
            onChange={(e) => setNewStask({ ...newTask, content: e.target.value })}
          />
          <Space direction="vertical">
            <DatePicker onChange={(date, dateString) => { setNewStask({ ...newTask, date: dateString }) }} />

          </Space>

          <Select
            defaultValue="TO_DO"
            onChange={(value) => setNewStask({ ...newTask, status: value })}
          >

            <Option value="TO_DO">To do</Option>
            <Option value="DOING">Doing</Option>
            <Option value="DONE">Done</Option>
          </Select>

        </form>
      </Modal>
      <Modal title="Cap Nhat Cong Viec" visible={isEddingTask} onOk={() => handleEddingTask()} onCancel={() => { setisEddingTask(false) }}>

        <form>

          <Input
            placeholder="Content"
            type="text"
            value={editTask.content}
            onChange={(e) => setEditTask({ ...editTask, content: e.target.value })}
          />
          <Space direction="vertical">
            <DatePicker onChange={(date, dateString) => { setEditTask({ ...editTask, date: dateString }) }} />

          </Space>

          <Select
            defaultValue="TO_DO"
            onChange={(value) => setEditTask({ ...editTask, status: value })}
          >

            <Option value="TO_DO">To do</Option>
            <Option value="DOING">Doing</Option>
            <Option value="DONE">Done</Option>
          </Select>

        </form>
      </Modal>
      <br />

      <br />

      <Row>
        <Col span={8}>
          <Divider orientation='left'>Công Việc Cần Làm</Divider>

          <List>

            {tasks
              .filter((task) => task.status === "TO_DO")
              .map((task, i) => (

                <div className="">
                  <p key={i}></p>
                  <ul>

                    <li>  {task.content} ngày {task.date} <Button><i onClick={() => updateStatus(task.id, "DOING")} className="fa-solid fa-check"></i></Button> <Button onClick={() => deleteStatus(task.id)}> <DeleteOutlined /></Button> <Button onClick={() => ediTask(task.id)} ><PlusOutlined /></Button> </li>

                  </ul>
                </div>

              ))}

          </List></Col>
        <Col span={8}>
          <Divider orientation='left'>Công Việc Đang Làm </Divider>
          <List>
            {tasks
              .filter((task) => task.status === "DOING")
              .map((task, i) => (
                <div className="Ding">

                  <ul>
                    <li>  {task.content}  ngày {task.date} <Button><i onClick={() => updateStatus(task.id, "DONE")} className="fa-solid fa-check"></i></Button>  <Button onClick={() => deleteStatus(task.id)}> <DeleteOutlined /></Button> <Button onClick={() => ediTask(task.id)} ><PlusOutlined /></Button> </li>
                  </ul>
                </div>

              ))}
          </List></Col>
        <Col span={8}>
          <Divider orientation='left'>Công Việc Đã Làm</Divider>
          <List>
            {tasks
              .filter((task) => task.status === "DONE")
              .map((task, i) => (
                <div className="">


                  <ul>
                    <li> {task.content}  ngày {task.date} <Button><i className="fa-solid fa-check"></i></Button> <Button onClick={() => deleteStatus(task.id)}> <DeleteOutlined /></Button>  </li>
                  </ul>
                </div>

              ))}
          </List>

        </Col>
      </Row>


    </>
  );
}

export default App;