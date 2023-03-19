import { useState } from "react";
import axios from "axios";

const usePatchHook = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(url, data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);

      setError(error?.response?.data.message);
    }
  };

  return { updateData, isLoading, error };
};

export default usePatchHook;
