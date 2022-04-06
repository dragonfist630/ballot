import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

var Login = () => {
  let navigate = useNavigate();
  
  const [userreg, updateuserreg] = useState({
    emailId: "",
    password: "",
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
      const done = await fetch("https://ballotdb.herokuapp.com/login", requestOptions);
      const data = await done.json();
      var responseData = data;
      if (responseData.error) {
        var millisecondsToWait = 1000;
        setTimeout(function () {
          displayMessage(responseData.error+"!");
        }, millisecondsToWait);
      } else {
        setTimeout(function () {
          const [userId, fName, lName] = responseData;
          if (userId === "623959c75a32210734e0f26e") {
            window.localStorage.setItem("userId",userId);
            window.localStorage.setItem("fName",fName);
            window.localStorage.setItem("lName",lName);
            navigate("/homepage");
          } else {
            window.localStorage.setItem("userId",userId);
            window.localStorage.setItem("fName",fName);
            window.localStorage.setItem("lName",lName);
            navigate("/allframes");
          }
        }, millisecondsToWait);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const displayMessage = (m) =>{
    updatemessage(m);
    document.querySelector('input[type="email"]').style.border = "3px solid red";
    document.querySelector('input[type="password"]').style.border = "3px solid red";
  };
  const handleInput = (e) => {
    updatemessage("");
    document.querySelector('input[type="email"]').style.border = "";
    document.querySelector('input[type="password"]').style.border = "";
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    fetchFunction();
    updateuserreg({ emailId: "", password: "" });
  };
  return (
    <>
      <Nav />
      <Container className="reg lgin">
        <Upperpart top_heading="Welcome! Again" heading="Login" bottom_heading="New here?" link="Register account" href="/reg" />
        <form action="#" onSubmit={onsubmit}>
          <div className="email-to-password" id="login_input">
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
            <Link to="/forgotpass" id="link" sx={{ color: "#0029FE", textDecoration: "none", fontSize: "1.5rem" }}>
              Forget Password?
            </Link>
            <span id="error">{message}</span>
          </div>
          <Button text="LogIn" display="none" />
        </form>
      </Container>
    </>
  );
};
export default Login;
