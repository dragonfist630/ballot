import "./Ahomepage.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import { useContext, useState, useEffect } from "react";
import { APIcontext } from "../API/APIProvider";

const Ahomepage = (props) => {
  const { vote, userInfos } = useContext(APIcontext);
  const [userInfo, setuserInfo] = userInfos;
  const temp = userInfo.userId;

  const [frame, updateFrame] = Object.assign([], vote);
  const tempVotes = frame.slice();
  console.log("Just after transefrring votes", tempVotes);
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
          alert(responseData.message);
          // fetchcastedVotes();
        }, millisecondsToWait);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const array = [];
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
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchcastedVotes();
    setTimeout(() => {
      changevoted();
    }, 2000);
  }, []);
  const handleSubmit = (id) => {
    temparray.push(id);
    console.log("After clicking submit.", temparray);
    changevoted();
    fetchFunction(id);
    // console.log(array);
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
    console.log("Inside chnangevoted()",temparray);
    for (let i = 0; i < temparray.length; i++) {
      for (let j = 0; j < tempVotes.length; j++) {
        if (tempVotes[j]._id === temparray[i]) {
          const temp = { isvoted: true };
          tempVotes[j] = Object.assign(tempVotes[j], temp);
          break;
        }
      }
    }
    console.log("Just after the for loop", tempVotes);
    updateFrame(tempVotes);
    console.log("Just after the for loop", frame);
  }
  // setTimeout(() => {
  //   changevoted();
  // }, 2500);
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
          <Container className="Inner_container">
            {frame.map((currElem, index) => {
              return (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(currElem._id);
                  }}
                  className="inner_form"
                  key={currElem._id}
                >
                  <h3>{currElem.queryName}</h3>
                  {currElem.optionName.map((curr, index) => {
                    return (
                      <div key={index}>
                        <div className="percent_name_wrap">
                          {props.admin || currElem.isvoted ? (
                            <span>{currElem.value[index] !== 0 ? Math.floor((currElem.value[index] / currElem.totalVotes) * 100) : 0}%</span>
                          ) : (
                            <input type="radio" name="options" value={curr} required style={{ color: "blue", width: "30px", height: "50px" }} />
                          )}
                          <h3>{curr}</h3>
                        </div>
                        {props.admin || currElem.isvoted ? (
                          <div className="progress p_inline_bar">
                            <div
                              className="progress-bar inline-progress-bar"
                              role="progressbar"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: (currElem.value[index] / currElem.totalVotes) * 100 + "%" }}
                            ></div>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    );
                  })}
                  <div className="bottom_form">
                    <div className="usersPic_voteCount">Total vote: {currElem.totalVotes}</div>
                    <div className="EditRemoveIcon_wrap">
                      {props.admin ? (
                        <img
                          src={require("../image/remove.png")}
                          alt="delete"
                          onClick={() => {
                            removeFrame(currElem._id);
                          }}
                          width={"35.063rem"}
                          height={"35.063rem"}
                        />
                      ) : (
                        <Button text="Vote" display="none" />
                      )}
                    </div>
                  </div>
                </form>
              );
            })}
          </Container>
        </Container>
      </div>
    </>
  );
};

export default Ahomepage;
