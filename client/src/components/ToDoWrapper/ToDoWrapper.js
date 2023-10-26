import React, { useState, useEffect } from 'react';
import { ToDo } from '../ToDo/ToDo';
import { Button } from '../Button/Button';
import { WarningMessage } from '../WarningMessage/WarningMessage';
import './ToDoWrapper.scss';
import { TopBar } from '../TopBar/TopBar';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../../store/todos';
import { InputField1 } from '../InputField/InputField.style.js';

/**
 * ToDoWrapper Component
 * This Component contains the entire Todo List Page Dashboard Logic.
 */
export const ToDoWrapper = () => {
  const dispatch = useDispatch();
  const todosPresent = useSelector((state) => state.todos.tasks);
  console.log(todosPresent);
  const [todos, setTodos] = useState(todosPresent);
  const [warning, setWarning] = useState(false);
  const [value, setValue] = useState('');

  /*useEffect(() => {
    setTodos(todosPresent);
  }, [todosPresent]);*/

  useEffect(() => {
    console.log("Updated todos:", todos);
  }, [todos]);


  const addToDo = (todo) => {
    if (todo) {
      setTodos([...todos, { id: uuidv4(), task: todo, priority: 'low', completed: false, isEditing: false }]);
      console.log(todo);
      console.log(todos);
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo(value);
    dispatch(addTask(value));
    setValue('');
  };

  const deleteToDo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    dispatch(deleteTask(id)); //-> dispatch deleteTask function
  }

  return (
    <>
      <TopBar />
      <div className="toDoWrapper">
        <WarningMessage warning={warning} warningMessage={'Task cannot be Empty'} />
        <form className="todoform" onSubmit={handleSubmit}>
          <InputField1 type="text"
            placeholder="Add a new task"
            onChange={(e) => setValue(e.target.value)}
            value={value}/>
          <Button type="submit" className="todo-btn">
            Add
          </Button>
        </form>
        {todos.map((todo, index) => (
          <ToDo tasks={todo} key={index} deleteToDo ={deleteToDo}/>
        ))}
      </div>
    </>
  );
};
