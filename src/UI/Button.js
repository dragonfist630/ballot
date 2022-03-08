import React from "react";
import "./Button.css";

const Button = (props) => {
    var text = props.text;
  return (
    <button type="submit" id="reg_submit">
      {text}
    </button>
  );
};

export default Button;
