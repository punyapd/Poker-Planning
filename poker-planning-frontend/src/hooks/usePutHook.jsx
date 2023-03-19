import { useState } from "react";
import axios from "axios";

const usePutHook = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(url, data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);

      setError(error?.response?.data.message);
    }
  };

  return { updateData, isLoading, error };
};

export default usePutHook;
