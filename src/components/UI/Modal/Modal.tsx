import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Modal: React.FC<{children: ReactNode}> = ({children}) => {

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles['modal']}>
          <div className={styles['backdrop']}></div>
          <div className={styles['popup']}>
            {children}
          </div>
        </div>,
        document.getElementById('modal')!
      )}
    </>
    )
}

export default Modal