import {useState} from 'react';
import axios from 'axios';

// Ne bih povezivao useAxios hook sa post-ovima
// const useAxios = (setPosts) => {
const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const sendRequest = async ({method, url, data = null}, setPostCallback) => {
    setIsLoading(true);
    setError(null);
    try {
      if (method === 'simulateError') {
        throw new Error('Simulated error occurred');
      }
      // if(method === 'GET') {
      //   const response = await axios({
      //     method: method,
      //     url: url
      //   });
      //   setPosts(response.data);
      // } else {
      //   await axios({
      //     method: method,
      //     url: url,
      //     data: data
      //   });
      //   setPosts(setPostCallback);
      // }
      const res = await axios({
        method: method,
        url: url,
        data: data,
      });
      if (res.data) setResult(res.data);
    } catch(err) {
      setResult(null);
      setError(err);
    }
    setIsLoading(false);
  };

  return {isLoading, error, sendRequest, result}
};

export default useAxios;