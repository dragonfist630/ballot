import "./nav.css";
import { Link } from "react-router-dom";

var Nav = (props) => {
  return (
    <nav className="navbar-light">
      <div className="display">
        <div className="img-size"></div>
        <span className=" header">Ballot</span>
      </div>
      {props.logedin ? (
        <div id="imgSpan_wrap">
          <Link to={"/login"} className="logoutSpan">
          <span>Log out</span></Link>
          <img src={require("./image/6144.jpg")} alt="the_pic" id="profile_pic" />
        </div>
      ) : (
        <span></span>
      )}
    </nav>
  );
};
export default Nav;

// navbar-expand-lg
// navbar
// container
// navbar-brand