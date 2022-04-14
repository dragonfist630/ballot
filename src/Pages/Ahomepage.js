import { useEffect, useCallback,useMemo } from "react";
import Container from "@mui/material/Container";
import Frame from "./Frame";
import Nav from "../Components/nav";
import "./Ahomepage.css";

const Ahomepage = ({admin}) => {
  const userId = window.localStorage.getItem("userId");
  const fName = window.localStorage.getItem("fName");
  const lName = window.localStorage.getItem("lName");
  const temparray = useMemo(()=>[],[]);
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
        // console.log("Got voted data by user, temparray= , data=", temparray, data);
      // }, 1000);
    } catch (err) {
      console.log(err);
    }
  }, [userId, temparray]);
  useEffect(() => {
    // console.log("useEffect has ran from Ahomepage.js");
    fetchcastedVotes();
  }, [fetchcastedVotes]);
  return (
    <>
      <Nav logedin="true" firstName={fName} lastName={lName} admin={admin} />
      <div className="Ahomepage_form">
        <Container id="Outer_container">
          <Frame admin={admin} temparray={temparray} usercred={userId} />
        </Container>
      </div>
    </>
  );
};
export default Ahomepage;
