import { useState, useEffect } from "react";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);

      const response = await fetch(
        `https://react-js-assignment-default-rtdb.firebaseio.com/users.json`
      );

      const data = await response.json();
      const usersArray = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setUsers(usersArray);

      setIsLoading(false);
    };

    getUsers();
  }, []);

  return { users, isLoading };
};

export default useGetUsers;
