import "./nav.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

var Nav = ({ homepage, logedin, firstName, lastName, admin }) => {
  var Logedin;
  var fName;
  var lName;
  var ishomepage = false;
  let width4Admin;
  if (admin) {
    width4Admin = "55%";
  }
  const windowSize = window.innerWidth;
  // console.log(windowSize);
  homepage === undefined ? (ishomepage = false) : (ishomepage = true);
  logedin === undefined ? (Logedin = false) : (Logedin = true);
  firstName === undefined ? (fName = " ") : (fName = firstName);
  lastName === undefined ? (lName = " ") : (lName = lastName);
  var pp = fName.split("")[0] + lName.split("")[0];
  const PP = pp.toUpperCase();
  const blankSpan = <span></span>;
  let textinButton ;
  windowSize <= 768 && windowSize<468 ? (textinButton = "Add frame") : (textinButton = "+Add frame");
  let Width = "120%";
  if (windowSize <= 468) {
    textinButton = "+";
    Width = "4.3rem";
  } 
  const addFrame = (
    <div id="add_frame">
      <Link to="/createquery">
        <Button text={textinButton} display="none" width={Width} />
      </Link>
    </div>
  );
  return (
    <nav className="navbar-light fluid">
      <div className="display">
        <div className="img-size"></div>
        <span className=" header">Ballot</span>
      </div>
      {Logedin ? (
        <div id="imgSpan_wrap" style={{ width: width4Admin }}>
          {admin ? addFrame : blankSpan}
          {ishomepage ? (
            <Link to={homepage[1]} className="logoutSpan">
              {homepage[0]}
            </Link>
          ) : (
            blankSpan
          )}
          <span id="profile_pic">{PP}</span>
          <Link to={"/"} className="logoutSpan">
            <span>Logout</span>
          </Link>
        </div>
      ) : (
        blankSpan
      )}
    </nav>
  );
};
export default Nav;
