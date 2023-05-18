import React, {useContext, useState, useEffect} from 'react';
import useAxios from '../hooks/useAxios';

const PostContext = React.createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostProvider = ({children}) => {

  // Ovo bih stavio u env file
  const API = 'http://localhost:3000/posts';

  // const [posts, setPosts] = useState(null);

  // const {isLoading, error, sendRequest} = useAxios(setPosts);
  const {result: posts, isLoading, error, sendRequest} = useAxios();
  const {result: createResult, isLoading: createIsLoading, error: createError, sendRequest: createSendRequest} = useAxios();
  const {result: updateResult, isLoading: updateIsLoading, error: updateError, sendRequest: updateSendRequest} = useAxios();
  const {result: removeResult, isLoading: removeIsLoading, error: removeError, sendRequest: removeSendRequest} = useAxios();

  useEffect(() => {
    sendRequest({method: 'GET', url: API});
  }, [updateResult, removeResult, createResult])

  const create = (newPost) => {
    // sendRequest({method: 'POST', url: API, data: {id: newPost.id, text: newPost.text}}, prevState => [...prevState, newPost]);
    createResult(
      { method: 'POST', url: API, data: { ...newPost } },
    );
  };

  const update = (updatedPost) => {
    // sendRequest({method: 'PUT', url: `${API}/${updatedPost.id}`, data: {id: updatedPost.id, text: updatedPost.text}}, prevState => prevState.map(post => post.id === updatedPost.id ? updatedPost : post));
    updateSendRequest({method: 'PUT', url: `${API}/${updatedPost.id}`, data: {...updatedPost}});
  }

  const remove = (id) => {
    // sendRequest({method: 'DELETE', url: `${API}/${id}`}, prevState => prevState.filter(post => post.id !== id));
    removeSendRequest({method: 'DELETE', url: `$${API}/${id}`});
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