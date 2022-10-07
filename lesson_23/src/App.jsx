import { useState } from 'react'; 
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
   // Tasks (ToDo List) State
   const [toDo, setToDo] = useState([]);
   // Временное состояние ! для хранения временных данных---------------
   const [newTask, setNewTask] = useState('');
   const [updateData, setUpdateData] = useState('');

    // Добавить задачу!---------------------------------------------
    const addTask = () => {
      if(newTask) {
        let num = toDo.length + 1; 
        let newEntry = { id: num, title: newTask, status: false }
        setToDo([...toDo, newEntry])
        setNewTask('');
      }
    }
    // Удалить задачу! эта функция нуждается в id
    //для того чтобы определить какую именно задачу нужно удалить ---------------------------------------- 
    const deleteTask = (id) => {
      let newTasks = toDo.filter( task => task.id !== id)
      setToDo(newTasks);
    }

    //функция, чтобы пометить задачу как завершенную---------------------------------------- 
    const markDone = (id) => {
      let newTask = toDo.map( task => {
        if( task.id === id ) {
          return ({ ...task, status: !task.status })
        }
        return task;
      })
      setToDo(newTask);
    }

    //Функция отмены обновления---------------------------------------- 
    const cancelUpdate = () => {
      setUpdateData('');
    }

    // Редактиновать задачу  (она примет  event и получит значение из события)----
    const changeTask = (e) => {
      let newEntry = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status ? true : false
      }
      setUpdateData(newEntry);
    }

    //Обновить задачу ---------------------------------------- 
    const updateTask = () => {
      let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
      let updatedObject = [...filterRecords, updateData]
      setToDo(updatedObject);
      setUpdateData('');
    }
  return (
    <div className="container App">
        <br /><br />
         {/*Заголовок*/}
        <h2>To Do List App</h2>
        <br /><br />
        {/*Обновить задачу*/}
        {updateData && updateData ?(
          <UpdateForm 
              updateData={updateData}
              changeTask={changeTask}
              updateTask={updateTask}
              cancelUpdate={cancelUpdate}
          />
        ) : (
          <AddTaskForm 
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          />
        )}
        {/* Display ToDos если этот список пуст, а затем отображать сообщение'No Tasks...' */}
        {toDo && toDo.length ? '' : 'No Tasks...'} 
        <ToDo
          toDo={toDo}
          markDone={markDone}
          setUpdateData={setUpdateData}
          deleteTask={deleteTask}
        />  
      </div>
  );
}

export default App;
