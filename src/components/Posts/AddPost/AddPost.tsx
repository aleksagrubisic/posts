import React, {useState} from 'react';
import {v4} from 'uuid';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {usePostContext} from '../../../context/posts.context';

const AddPost: React.FC = () => {

  const [newTask, setNewTask] = useState('');

  const {create} = usePostContext();

  const newTaskHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setNewTask(e.target.value);
  }

  const createHandler = () => {
    create({
      id: v4(),
      text: newTask
    });
    setNewTask('');
  }

  return (
    <form>
      <Input value={newTask} onChangeHandler={newTaskHandler} />
      <Button onClickHandler={createHandler}>Add</Button>
    </form>
  )
}

export default AddPost;