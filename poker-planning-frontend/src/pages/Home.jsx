import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { getKey } from "../helpers/sessionKey";
import useGetHook from "../hooks/useGetHook";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getKey("userData")) {
      navigate("/login");
    }
  });
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
