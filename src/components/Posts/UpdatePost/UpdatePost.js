import React, {useState} from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import {usePostContext} from '../../../context/posts.context';

const UpdatePost = ({updatedPostHandler, updatedPostID}) => {

  const [updatedPost, setUpdatedPost] = useState('');

  const {update} = usePostContext();

  const newPostHandler = (e) => {
    setUpdatedPost(e.target.value);
  }

  const updateHandler = () => {
    if(updatedPost !== '') {
      update({
        id: updatedPostID,
        text: updatedPost
      })
      setUpdatedPost('');
      updatedPostHandler(null);
    }
  };

  return (
    <Modal>
      <form>
        <Input value={updatedPost} onChangeHandler={newPostHandler}></Input>
        <Button onClickHandler={updateHandler}>Update</Button>
        <Button onClickHandler={() => updatedPostHandler(null)}>Cancel</Button>
      </form>
    </Modal>
  )
}

export default UpdatePost