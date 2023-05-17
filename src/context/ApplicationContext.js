import React from 'react';
import {PostProvider} from './posts.context';

const ApplicationContext = ({children}) => {
  return (
    <PostProvider>
      {children}
    </PostProvider>
  )
}

export default ApplicationContext