import React from 'react';

const Button = ({children, onClickHandler}) => {
  return (
    <button onClick={onClickHandler} type='button'>{children}</button>
  )
}

export default Button;