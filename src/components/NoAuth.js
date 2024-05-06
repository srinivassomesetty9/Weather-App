import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbartop from './Navbartop'

export default function NoAuth() {
  let navigate = useNavigate();
  return (
    <>
      {/* <div className="App">
      <Navbartop /> */}
      <div className="home">
        <h2>Session Expried. Please Login again</h2>
        <Button onClick={() => navigate("/")} variant="outlined">
          Login
        </Button>
      </div>
      {/* </div> */}
    </>
  );
}
