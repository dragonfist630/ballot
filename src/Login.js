import "./reg.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useState } from "react";

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
    // console.log(userreg);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    //validation part is here to be written
    updateuserreg({ email: "", password: "" });
    console.log(userreg);
  };
  return (
    <Container className="reg lgin" >
      <p>Welcome! Again</p>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins",
          fontSize: "4.5rem",
          color: "white",
          fontWeight: "700",
        }}
      >
        Login
        <Typography
          variant="span"
          sx={{
            fontFamily: "Poppins",
            fontSize: "6rem",
            fontWeight: "700",
            color: "#0029FE",
            lineHeight: "2.25rem",
          }}
        >
          .
        </Typography>
      </Typography>
      <Typography
        variant="span"
        sx={{
          fontFamily: "Poppins",
          fontSize: "1.5rem",
          fontWeight: "light",
          color: "white",
          lineHeight: "3.25rem",
        }}
      >
        New here?
        <Link href="/" sx={{ color: "#0029FE", textDecoration: "none" }}>
          {" "}
          Register account
        </Link>
      </Typography>
      <form action="#" onSubmit={onsubmit}>
        <div className="email-to-password" id="login_input">
          <input type="email" placeholder="Email" autoComplete="off" value={userreg.email} onChange={handleInput} name="email" />
          <input type="password" placeholder="Password" required autoComplete="off" value={userreg.password} onChange={handleInput} name="password" />
          <Link href="#" sx={{ color: "#0029FE", textDecoration: "none", fontSize: "1.5rem" }}>
            {" "}
            Forget Password?
          </Link>
        </div>
        <button type="submit" id="reg_submit">
          LogIn
        </button>
      </form>
    </Container>
  );
};
export default Login;
