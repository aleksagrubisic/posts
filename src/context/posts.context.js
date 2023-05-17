import React, {useContext, useState, useEffect} from 'react';
import useAxios from '../hooks/useAxios';

const PostContext = React.createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostProvider = ({children}) => {

  const API = 'http://localhost:3000/posts';

  const [posts, setPosts] = useState(null);

  const {isLoading, error, sendRequest} = useAxios(setPosts);

  useEffect(() => {
    sendRequest({method: 'GET', url: API});
  }, [])

  const create = (newPost) => {
    sendRequest({method: 'POST', url: API, data: {id: newPost.id, text: newPost.text}}, prevState => [...prevState, newPost]);
  };

  const update = (updatedPost) => {
    sendRequest({method: 'PUT', url: `${API}/${updatedPost.id}`, data: {id: updatedPost.id, text: updatedPost.text}}, prevState => prevState.map(post => post.id === updatedPost.id ? updatedPost : post));
  }

  const remove = (id) => {
    sendRequest({method: 'DELETE', url: `${API}/${id}`}, prevState => prevState.filter(post => post.id !== id));
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