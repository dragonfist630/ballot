import "./Ahomepage.css";
import Frame from "./Frame";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Button from "../UI/Button";
import Container from "@mui/material/Container";
import { useEffect, useCallback } from "react";

const Ahomepage = (props) => {
  const userId = window.localStorage.getItem("userId");
  const fName = window.localStorage.getItem("fName");
  const lName = window.localStorage.getItem("lName");
  const temparray = [];
  const fetchcastedVotes = useCallback(async () => {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ myId: userId }),
    };
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/getvotedquery", requestOptions);
      const data = await done.json();
      //setTimeout(() => {
        temparray.push(...data);
        // console.log("When we get data from API", temparray, data);
      // }, 1000);
    } catch (err) {
      console.log(err);
    }
  }, [userId, temparray]);
  useEffect(async() => {
    // console.log("useEffect has ran from Ahomepage.js");
    await fetchcastedVotes();
  }, [fetchcastedVotes]);
  return (
    <>
      <Nav logedin="true" firstName={fName} lastName={lName} admin={props.admin} />
      <div className="Ahomepage_form">
        <Container id="Outer_container">
          <Frame admin={props.admin} temparray={temparray} usercred={userId} />
        </Container>
      </div>
    </>
  );
};

export default Ahomepage;
