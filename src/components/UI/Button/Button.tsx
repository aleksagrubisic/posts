import React, { ReactNode } from 'react';

const Button: React.FC<{children: ReactNode, onClickHandler: () => void}> = ({children, onClickHandler}) => {
  return (
    <button onClick={onClickHandler} type='button'>{children}</button>
  )
}

export default Button;