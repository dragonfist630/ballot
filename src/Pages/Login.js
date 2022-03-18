import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

var Login = () => {
  const temp = {"emailId":"gadharinayan@gmail.com", "password":"pass@123"}
  const requestOptions = {
    mode:"no-cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temp),
  };
  fetch('http://localhost:4000/users/login', requestOptions)
    .catch((response) => console.log(response.json()));
  const [userreg, updateuserreg] = useState({
    emailId: "",
    password: "",
  });
  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
  };
  let navigate = useNavigate();
  function req() {
    navigate("/homepage");
  }
  const onsubmit = (e) => {
    e.preventDefault();
    //validation part is here to be written
      // .catch((data) => alert(data));

    console.log(JSON.stringify({ emailId: "gadharinayan@gmail.com", password: "pass@123" }));
    updateuserreg({ emailId: "", password: "" });
    console.log(userreg);
    req();
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
