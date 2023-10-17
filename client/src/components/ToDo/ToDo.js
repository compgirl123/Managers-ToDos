import React from 'react';
import './ToDo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * ToDo Component
 * This Component contains the Code for an Invidiual To Do List Item
 */
export const ToDo = (props) => {
  const {tasks,deleteToDo} = props;

  return (
    <div className= 'toDo'>
    <p>{tasks.task}</p>
      {/* Do not delete Below */}
      {/*<FontAwesomeIcon className="edit-icon" icon={faPenToSquare} /*onClick={() => editTodo(task.id)} />*/}
      <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteToDo(tasks.id)} />
   </div>

  );
};

