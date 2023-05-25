import React from 'react';

const Input: React.FC<{onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string}> = ({onChangeHandler, value}) => {
  return (
    <input onChange={onChangeHandler} value={value} type="text" />
  )
}

export default Input;