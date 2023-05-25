import {useState} from 'react';
import axios from 'axios';
import {PostType} from '../models/postType';

const useAxios = () => {
  const [isLoading, setIsLoading] = useState<true | false>(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<PostType[] | null>(null);

  const sendRequest = async ({method, url, data = null}: {method: string, url: string, data: PostType | null}) => {
    setIsLoading(true);
    setError(null);
    try {
      if (method === 'simulateError') {
        throw new Error('Simulated error occurred');
      }
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