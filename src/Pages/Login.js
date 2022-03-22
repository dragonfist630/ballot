import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APIcontext } from "../API/APIProvider";

var Login = () => {
  let navigate = useNavigate();
  const {vote,userInfos} = useContext(APIcontext);
  const [userInfo,setuserInfo] = userInfos;
  const [userreg, updateuserreg] = useState({
    emailId: "",
    password: "",
  });
  const fetchFunction = async () => {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userreg }),
    };
    try {
      const done = await fetch("http://localhost:3000/login", requestOptions);
      const data = await done.json();
      var responseData = data;
      console.log({ data });
      if(responseData.error){
      var millisecondsToWait = 1000;
      setTimeout(function () {
        alert(responseData.error);
      }, millisecondsToWait);
    }
    else{
      setTimeout(function () {
        const [userId,fName,lName] = responseData;
        if(userId==="623959c75a32210734e0f26e"){
        setuserInfo({userId,fName,lName});
        navigate('/homepage');
        }
        else{
          setuserInfo({userId,fName,lName});
          navigate('/allframes');
        }
      }, millisecondsToWait);
    }
    
  } 
    catch (error) {
      console.log(error);
    }
  };


  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
  };
  
  // function req() {
  //   navigate("/homepage");
  // }
  const onsubmit = (e) => {
    e.preventDefault();
    fetchFunction();
    updateuserreg({ emailId: "", password: "" });
    // req();
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
          </div>
          <Button text="LogIn" display="none" />
        </form>
      </Container>
    </>
  );
};
export default Login;
