import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Upperpart = ({top_heading,heading,bottom_heading,link,href}) => {
  return (
    <>
      <p>{top_heading}</p>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins",
          fontSize: "4.5rem",
          fontWeight: "700",
        }}
      >
        {heading}
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
        id="bottomWhitepart"
        variant="span"
        sx={{
          fontFamily: "Poppins",
          fontSize: "1.5rem",
          fontWeight: "light",
          lineHeight: "3.25rem",
        }}
      >
        {bottom_heading}
        <Link  to={href} sx={{ color: "#0029FE"}} style={{ textDecoration: 'none' }}>
         {link} 
        </Link>
      </Typography>
    </>
  );
};

export default Upperpart;
