import {useState} from 'react';
import axios from 'axios';

const useAxios = (setPosts) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async ({method, url, data = null}, setPostCallback) => {
    setIsLoading(true);
    setError(null);
    try {
      if (method === 'simulateError') {
        throw new Error('Simulated error occurred');
      }
      if(method === 'GET') {
        const response = await axios({
          method: method,
          url: url
        });
        setPosts(response.data);
      } else {
        await axios({
          method: method,
          url: url,
          data: data
        });
        setPosts(setPostCallback);
      }
    } catch(err) {
      setError(err);
    }
    setIsLoading(false);
  };

  return {isLoading, error, sendRequest}
};

export default useAxios;