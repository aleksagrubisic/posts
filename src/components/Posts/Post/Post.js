import React from 'react'
import Button from '../../UI/Button/Button';
import {usePostContext} from '../../../context/posts.context';

const Post = ({children, id, onUpdate}) => {

  const {remove} = usePostContext();

  const deleteHandler = () => {
    remove(id);
  }

  return (
    <li>
      {children}
      <div>
        <Button onClickHandler={deleteHandler}>Delete</Button>
        <Button onClickHandler={() => onUpdate(id)}>Update</Button>
      </div>
    </li>
  )
}

export default Post