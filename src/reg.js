import "./reg.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useState } from "react";


var Reg = () => {
  const [userreg, updateuserreg] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [records, updaterecord] = useState([]);

  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
    console.log(userreg);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    //validation part is here to be written
    const pass_check = userreg.password === userreg.c_password ? true : false;
    if (pass_check) {
      const record_with_id = { ...userreg, id: new Date().getTime().toString() };
      updaterecord([...records, record_with_id]);
      updateuserreg({ f_name: "", l_name: "", email: "", password: "", c_password: "" });
    } else {
      alert("Both the passwords doesn't match");
    }
  };
  return (
    <Container className="reg">
      
      <p>Start for free</p>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins",
          fontSize: "4.5rem",
          color: "white",
          fontWeight: "700",
        }}
      >
        Create new account
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
        Already A Memeber?
        <Link href="#" sx={{ color: "#0029FE", textDecoration: "none" }}>
          {" "}
          LogIn
        </Link>
      </Typography>
      <form action="#" onSubmit={onsubmit}>
        <div className="Initals">
          <input type="text" placeholder="First name" required autoComplete="off" value={userreg.f_name} onChange={handleInput} name="f_name" />
          <input type="text" placeholder="Last name" required autoComplete="off" value={userreg.l_name} onChange={handleInput} name="l_name" />
        </div>
        <div className="email-to-password">
          <input type="email" placeholder="Email" autoComplete="off" value={userreg.email} onChange={handleInput} name="email" />
          <input type="password" placeholder="Password" required autoComplete="off" value={userreg.password} onChange={handleInput} name="password" />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            required
            value={userreg.c_password}
            onChange={handleInput}
            name="c_password"
          />
        </div>
        <button type="submit" id="reg_submit">
          Create account
        </button>
      </form>
    </Container>
  );
};
export default Reg;
