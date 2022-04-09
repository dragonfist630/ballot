import { width } from "@mui/system";
import React from "react";
import "./Button.css";

const Button = (props) => {
  var text = props.text;
  var display = props.display;
  var width;
  var height;
  props.width === undefined ? width = "18.25rem" : width = props.width;
  props.height === undefined ?  height = "4.25rem" : height = props.height;
  
//  console.log(width, height);
  return (
    <button type="submit" className="reg_submit" style={{width:width, height:height}} >
      <img src={require("../image/plus.png")} width={"15%"} height={"60%"} style={{ display}} alt="plus_icon" />
      {text}
    </button>
  );
};

export default Button;
