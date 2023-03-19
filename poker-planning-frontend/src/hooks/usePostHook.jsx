import { useState } from "react";
import axios from "axios";

const usePostData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, JSON.stringify(data));
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);

      setError(error.response.data.message);
    }
  };

  return [postData, isLoading, error];
};

export default usePostData;
