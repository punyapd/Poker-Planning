import { useState, useEffect } from "react";
import axios from "axios";
const useSession = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [session, setSession] = useState([]);

  const getSessions = async () => {
    setIsLoading(true);

    await axios
      .post("http://pokerplanning.local:10015/api/session/create/")
      .then((response) => {
        const ticketsArray = Object.entries(response.data).map(
          ([key, value]) => ({
            id: key,
            ...value,
          })
        );
        setSession(ticketsArray);
        setIsLoading(false);
      });
  };

  //post tickets

  const postSessions = async (data) => {
    setIsLoading(true);

    await axios
      .post(
        "http://pokerplanning.local:10015/api/session/create/",
        JSON.stringify(data)
      )
      .then((response) => {
        setSession(response.data);
        setIsLoading(false);
      });
  };

  //deleter tickets
  const deleteSessions = async (id) => {
    setIsLoading(true);

    await axios
      .delete("http://pokerplanning.local:10015/api/users/login/")
      .then((response) => {
        setSession(tickets.filter((ticket) => ticket.id !== id));
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   getSessions();
  // }, []);

  return { session, isLoading, postSessions, deleteSessions };
};

export default useSession;
