import "./nav.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useState } from "react";

var Nav = (props) => {
  var logedin;
  var firstName;
  var lastName;
  var ishomepage = false;
  let width4Admin; 
  if(props.admin){
    width4Admin = "55%";
  }
  const windowSize = window.innerWidth;
  // console.log(windowSize);
  props.homepage === undefined ? (ishomepage = false) : (ishomepage = true);
  props.logedin === undefined ? (logedin = false) : (logedin = true);
  props.firstName === undefined ? (firstName = " ") : (firstName = props.firstName);
  props.lastName === undefined ? (lastName = " ") : (lastName = props.lastName);
  var pp = firstName.split("")[0] + lastName.split("")[0];
  const PP = pp.toUpperCase();
  const blankSpan = <span></span>
  var image="inline";
  windowSize <=768 ? image = "none" : image="inline";
  const addFrame = <div id="add_frame">
  <Link to="/createquery">
    <Button text="Add frame" display={image} width="120%" />
  </Link>
</div>;
  return (
    <nav className="navbar-light fluid">
      <div className="display">
        <div className="img-size"></div> 
        <span className=" header">Ballot</span>
      </div>
      {logedin ? (
        <div id="imgSpan_wrap" style={{width:width4Admin}}>
          {props.admin ? addFrame : blankSpan}
          {ishomepage ? (
            <Link to={props.homepage[1]} className="logoutSpan">
              {props.homepage[0]}
            </Link>
          ) : blankSpan}
          <span id="profile_pic">{PP}</span>
          <Link to={"/"} className="logoutSpan">
            <span>Logout</span>
          </Link>
        </div>
      ) : blankSpan}
    </nav>
  );
};
export default Nav;
