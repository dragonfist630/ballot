import "./reg.css";
import Button from "./UI/Button";
import Nav from "./nav";
import Upperpart from "./Components/Upper_part";
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
  
  const [records, updaterecord] = useState([]);

  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
    // console.log(userreg);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    //validation part is here to be written
    const pass_check = userreg.password === userreg.c_password ? true : false;
    if (pass_check) {
      const record_with_id = { ...userreg, id: new Date().getTime().toString() };
      updaterecord([...records, record_with_id]);
      updateuserreg({ firstName: "", lastName: "", emailId: "", password: "", c_password: "" });
      navigate("/");
    } else {
      // var temp = "border:'2px solid red'";
      // updateC_password_error(temp);
      alert("Your confirm password didn't match your the password you have entered Above.");
    }
  };
  return (
    <>
    <Nav/>
    <Container className="reg">
      <Upperpart top_heading="Start for free" heading="Create new account" bottom_heading="Already a member?" link="LogIn" href="/" />
      <form action="#" onSubmit={onsubmit}>
        <div className="Initals">
          <input type="text" placeholder="First name" required autoComplete="off" value={userreg.firstName} onChange={handleInput} name="firstName" />
          <input type="text" placeholder="Last name" required autoComplete="off" value={userreg.lastName} onChange={handleInput} name="lastName" />
        </div>
        <div className="email-to-password">
          <input type="email" placeholder="Email" required autoComplete="off" value={userreg.emailId} onChange={handleInput} name="emailId" />
          <input type="password" placeholder="Password" required autoComplete="off" value={userreg.password} onChange={handleInput} name="password" />
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
        </div>
        <Button text="Create account" display="none"/>
      </form>
    </Container>
    </>
  );
};
export default Reg;
