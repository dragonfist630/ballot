import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

var Reg = () => {
  let navigate = useNavigate();
  // const  [c_password_error, updateC_password_error] = useState("");
  const [userreg, updateuserreg] = useState({
    fistName: "",
    lastName: "",
    emailId: "",
    password: "",
    c_password: "",
  });
  const [message, updatemessage] = useState("");
  const fetchFunction = async () => {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userreg }),
    };
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/reg", requestOptions);
      const data = await done.json();
      var responseData = data;
      console.log({ data });
      if(responseData.error){
      var millisecondsToWait = 500;
      setTimeout(function () {
        displayMessage(responseData.error);
      }, millisecondsToWait);
    }
    else{
      setTimeout(function () {
        displayMessage(responseData.message);
        navigate('/');
      }, millisecondsToWait);
    }
    
  } 
    catch (error) {
      console.log(error);
    }
  };
  const [records, updaterecord] = useState([]);

  const displayMessage = (m) =>{
    updatemessage(m);
    if(m==="Email already exists."){
    document.querySelector('input[type="email"]').style.border = "3px solid red";
    document.querySelector('input[type="password"]').style.border = "";
      document.querySelector('input[placeholder="Confirm Password"]').style.border = "";  
    updateuserreg({...userreg,emailId: ""});  
    }
    if(m==="Both password should match."){
      document.querySelector('input[type="password"]').style.border = "3px solid red";
      document.querySelector('input[placeholder="Confirm Password"]').style.border = "3px solid red";
      document.querySelector('input[type="email"]').style.border = "";         
    }
  };

  const handleInput = (e) => {
    //checking of imput is here to pe written
    updatemessage("");
    document.querySelector('input[type="email"]').style.border = "";
    document.querySelector('input[type="password"]').style.border = "";
    document.querySelector('input[placeholder="Confirm Password"]').style.border = "";
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    //validation part is here to be written
    const pass_check = userreg.password === userreg.c_password ? true : false;
    if (pass_check) {
      const record_with_id = { ...userreg, id: new Date().getTime().toString() };
      updaterecord([...records, record_with_id]);
      fetchFunction();
    } else {
      displayMessage("Both password should match.");
    }
  };
  return (
    <>
      <Nav />
      <Container className="reg">
        <Upperpart top_heading="Start for free" heading="Create new account" bottom_heading="Already a member?" link="LogIn" href="/" />
        <form action="#" onSubmit={onsubmit}>
          <div className="Initals">
            <input
              type="text"
              placeholder="First name"
              required
              autoComplete="off"
              value={userreg.firstName}
              onChange={handleInput}
              name="firstName"
            />
            <input type="text" placeholder="Last name" required autoComplete="off" value={userreg.lastName} onChange={handleInput} name="lastName" />
          </div>
          <div className="email-to-password">
            <input type="email" placeholder="Email" required autoComplete="off" value={userreg.emailId} onChange={handleInput} name="emailId" />
            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={userreg.password}
              onChange={handleInput}
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              value={userreg.c_password}
              onChange={handleInput}
              name="c_password"
              // style={{c_password_error}}
            />
            <span id="error">{message}</span>
          </div>
          <Button text="Create account" display="none" />
        </form>
      </Container>
    </>
  );
};
export default Reg;
