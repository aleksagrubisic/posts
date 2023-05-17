import React from 'react';

const Input = ({onChangeHandler, value}) => {
  return (
    <input onChange={onChangeHandler} value={value} type="text" />
  )
}

export default Input;