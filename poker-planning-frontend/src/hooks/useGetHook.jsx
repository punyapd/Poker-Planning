import { useState, useEffect } from "react";
import axios from "axios";

function useGetHook(url, addStory) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    setInterval(getData, 5000);
  }, [url, addStory]);

  return { data, loading };
}

export default useGetHook;
