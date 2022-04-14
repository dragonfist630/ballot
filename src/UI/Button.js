import React from "react";
import "./Button.css";

const Button = ({text,display,width,height}) => {
  // var text = props.text;
  // var display = props.display;
  var Width;
  var Height;
  width === undefined ? Width = "18.25rem" : Width = width;
  height === undefined ?  Height = "4.25rem" : Height = height;
  
//  console.log(width, height); 
  return (
    <button type="submit" className="reg_submit" style={{width:Width, height:Height}} >
      <img src={require("../image/plus.png")} width={"15%"} height={"60%"} style={{ display}} alt="plus_icon" />
      {text}
    </button>
  );
};

export default Button;
