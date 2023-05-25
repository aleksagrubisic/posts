import React, {useContext, useState, useEffect, ReactNode} from 'react';
import useAxios from '../hooks/useAxios';
import {PostType} from '../models/postType';

const PostContext = React.createContext<{posts: null | PostType[], isLoading: true | false, error: null | any, create: (newPost: PostType) => void, remove: (id: string) => void, update: (updatedPost: PostType) => void}>({
  posts: null,
  isLoading: true,
  error: null,
  create: (newPost: PostType) => {},
  remove: (id: string) => {},
  update: (updatedPost: PostType) => {}
});

export const usePostContext = (): any => {
  return useContext(PostContext);
};

export const PostProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {result: posts, isLoading: getIsLoading, error: getError, sendRequest: getSendRequest} = useAxios();

  const {result: createResult, isLoading: createIsLoading, error: createError, sendRequest: createSendRequest} = useAxios();
  const {result: updateResult, isLoading: updateIsLoading, error: updateError, sendRequest: updateSendRequest} = useAxios();
  const {result: removeResult, isLoading: removeIsLoading, error: removeError, sendRequest: removeSendRequest} = useAxios();

  useEffect(() => {
    if(getIsLoading || createIsLoading || updateIsLoading || removeIsLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [getIsLoading, createIsLoading, updateIsLoading, removeIsLoading]);

  useEffect(() => {
    if(getError || createError || updateError || removeError) {
      setError(getError || createError || updateError || removeError);
    } else {
      setError(null);
    }
  }, [getError, createError, updateError, removeError]);

  useEffect(() => {
    getSendRequest({method: 'GET', url: `${process.env.REACT_APP_API}`, data: null});
  }, [updateResult, removeResult, createResult]);

  const create = (newPost: PostType) => {
    createSendRequest({ method: 'POST', url: `${process.env.REACT_APP_API}`, data: newPost});
  };

  const update = (updatedPost: PostType) => {
    updateSendRequest({method: 'PUT', url: `${process.env.REACT_APP_API}/${updatedPost.id}`, data: updatedPost});
  };

  const remove = (id: string) => {
    removeSendRequest({method: 'simulateError', url: `${process.env.REACT_APP_API}/${id}`, data: null});
  };

  return (
    <PostContext.Provider value={{
      posts,
      isLoading,
      error,
      create,
      remove,
      update
    }}>
      {children}
    </PostContext.Provider>
  )
};