import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Upperpart = (props) => {
  return (
    <>
      <p>{props.top_heading}</p>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins",
          fontSize: "4.5rem",
          color: "white",
          fontWeight: "700",
        }}
      >
        {props.heading}
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
        {props.bottom_heading}
        <Link href={props.href} sx={{ color: "#0029FE", textDecoration: "none" }}>
          {" "}
         {props.link}
        </Link>
      </Typography>
    </>
  );
};

export default Upperpart;