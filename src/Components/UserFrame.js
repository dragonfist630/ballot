import "./Ahomepage.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { APIcontext } from "../API/APIProvider";

const UserFrame = () => {
  const { vote, userInfos } = useContext(APIcontext);
  const [userInfo, setuserInfo] = userInfos;
  const [frame, updateFrame] = vote;

  return <>UserFrame</>;
};

export default UserFrame;
