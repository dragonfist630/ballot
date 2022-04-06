import "./Ahomepage.css";
import Frame from "./Frame";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import { useContext, useState, useEffect} from "react";
import { APIcontext } from "../API/APIProvider";

const Ahomepage = async (props) => {
  const { vote, userInfos, fetchframe } = useContext(APIcontext);
  const [userInfo, setuserInfo] = userInfos;
  const temp = userInfo.userId;
  const [frame, updateFrame] = useState([]);
  console.log("After I take frame from context API", vote);

  const fetchFunction = async (id) => {
    var voteChecked = document.querySelector('input[name="options"]:checked').value;
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userInfo.userId, queryName: id, optionName: voteChecked }),
    };
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/voteQueries", requestOptions);
      const data = await done.json();
      var responseData = data;
      var millisecondsToWait = 1000;
      if (responseData.error) {
        setTimeout(function () {
          alert(responseData.error);
        }, millisecondsToWait);
      } else {
        setTimeout(function () {
          console.log(responseData.message);
        }, millisecondsToWait);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // const array = [];
  const temparray = [];
  const fetchcastedVotes = async () => {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ myId: temp }),
    };
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/getvotedquery", requestOptions);
      const data = await done.json();
      setTimeout(() => {
        temparray.push(...data);
        console.log("When we get data from API", temparray, data);
        changevoted();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect( () => {
     fetchcastedVotes();
     fetchframe();
    setTimeout(() => {
      changevoted();
    }, 2000);
  }, []);

  const handleSubmit = (id) => {
    if (props.admin) {
      removeFrame(id);
    } else {
      temparray.push(id);
      console.log("After clicking submit.", temparray);
      changevoted();
      fetchFunction(id);
    }
  };

  var newRecord = [];
  const removeFrame = (id) => {
    console.log("This is inside removeFrame", id);
    newRecord = frame.filter((currElem) => {
      console.log("these id will be removed from frame", id);
      return currElem._id !== id;
    });
    updateFrame([...newRecord]);
    console.log("this is newRecord which is pushed in to frame", newRecord);
  };
  function changevoted() {
    // updateFrame([...vote]);
    var tempVotes = [];
    tempVotes = frame.slice();
    console.log("Just after transefrring votes", tempVotes);
    console.log("Inside chnangevoted()", temparray);
    for (let i = 0; i < temparray.length; i++) {
      for (let j = 0; j < tempVotes.length; j++) {
        if (tempVotes[j]._id === temparray[i]) {
          const temp = { isvoted: true };
          tempVotes[j] = Object.assign(tempVotes[j], temp);
          console.log("changedvoted fro loop", temparray[i]);
          break;
        }
      }
    }
    console.log("Just after the for loop", tempVotes);
    updateFrame(tempVotes);
    console.log("Just after updating the frame", frame);
    console.log("Last line of updatevote and this is castedvoteId's", temparray);
  }
  return (
    <>
      <Nav logedin="true" firstName={userInfo.fName} lastName={userInfo.lName} />
      <div className="Ahomepage_form">
        <Container className="reg" id="Outer_container">
          {props.admin ? (
            <div id="add_frame">
              <Link to="/createquery">
                <Button text="Add frame" display="inline" />
              </Link>
            </div>
          ) : (
            <span> </span>
          )}
          <Frame/>
        </Container>
      </div>
    </>
  );
};

export default Ahomepage;
// onClick={() => {
//   removeFrame(currElem._id);
// }}
