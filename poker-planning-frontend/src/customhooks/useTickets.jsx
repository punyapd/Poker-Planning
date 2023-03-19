import { useState, useEffect } from "react";
import axios from "axios";
const useTickets = (nodeName) => {
  const [isLoading, setIsLoading] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [singleTicket, setSingleTicket] = useState([]);

  const GetTickets = async () => {
    setIsLoading(true);

    await axios
      .get(
        `https://react-js-assignment-default-rtdb.firebaseio.com/tickets.json`
      )
      .then((response) => {
        const ticketsArray = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          nodeName: key,
        }));

        setTickets(ticketsArray);
        setIsLoading(false);
      });
  };

  const getSingleTicket = async () => {
    setIsLoading(true);

    await axios
      .get(
        `https://react-js-assignment-default-rtdb.firebaseio.com/tickets/${nodeName}/.json`
      )
      .then((response) => {
        setSingleTicket(response.data);
        setIsLoading(false);
      });
  };

  //post tickets

  const postTickets = async (data) => {
    setIsLoading(true);

    await axios
      .post(
        "https://react-js-assignment-default-rtdb.firebaseio.com/tickets.json",
        data
      )
      .then((response) => {
        setTickets([data, ...tickets]);
        setIsLoading(false);
      });
  };

  //deleter tickets
  const deleteTicket = async (name) => {
    setIsLoading(true);

    await axios
      .delete(
        `https://react-js-assignment-default-rtdb.firebaseio.com/tickets/${name}/.json`
      )
      .then((response) => {
        setTickets(tickets.filter((ticket) => ticket.nodeName !== name));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetTickets();
  }, []);
  useEffect(() => {
    getSingleTicket();
  }, []);

  return { tickets, singleTicket, isLoading, postTickets, deleteTicket };
};

export default useTickets;
