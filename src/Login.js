import "./reg.css";
import Button from "./UI/Button";
import Nav from "./nav";
import Upperpart from "./Components/Upper_part";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

var Login = () => {
  const [userreg, updateuserreg] = useState({
    email: "",
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
    updateuserreg({ email: "", password: "" });
    console.log(userreg);
    req();
  };
  return (
    <>
      <Nav />
      <Container className="reg lgin">
        <Upperpart top_heading="Welcome! Again" heading="Login" bottom_heading="New here?" link="Register account" href="/" />
        <form action="#" onSubmit={onsubmit}>
          <div className="email-to-password" id="login_input">
            <input type="email" placeholder="Email" required autoComplete="off" value={userreg.email} onChange={handleInput} name="email" />
            <input type="password" placeholder="Password" required autoComplete="off" value={userreg.password} onChange={handleInput} name="password" />
            <Link to="#" id="link">
              {" "}
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
