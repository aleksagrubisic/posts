import React, {ReactNode} from 'react';
import {PostProvider} from './posts.context';

const ApplicationContext: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <PostProvider>
      {children}
    </PostProvider>
  )
}

export default ApplicationContext