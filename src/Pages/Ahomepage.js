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
  const [frame, updateFrame] = vote;
  const [voted, updatevoted] = useState([]);
  const [voteFrame, setvoteFrame] = useState([]);

  const fetchFunction = async (id) => {
    var voteChecked = document.querySelector('input[name="options"]:checked').value;
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userInfo.userId, queryName: id, optionName: voteChecked }),
    };
    try {
      const done = await fetch("http://localhost:3000/voteQueries", requestOptions);
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
        }, millisecondsToWait);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchcastedVotes = async () => {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ myId: temp }),
    };
    try {
      const done = await fetch("http://localhost:3000/getvotedquery", requestOptions);
      const data = await done.json();
      setTimeout(function () {
        updatevoted(data);
        // addvotedFrames();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("Fetch function should be running.")
    fetchcastedVotes();
  },[]);
  const handleSubmit = (id) => {
    fetchFunction(id);
    fetchcastedVotes();
    console.log(voted);
  };
  
  var newRecords = [];
  const removeFrame = (id) => {
    const newRecord = frame.filter((currElem) => {
      return currElem._id !== id;
    });
    updateFrame(newRecord);
  };
  const addvotedFrames = () => {
    console.log("This is inside addvoteFrames",voted, frame);
    for (let j = 0; j < voted.length; j++) {
      for (let i = 0; i < frame.length; i++) {
        if (frame[i]._id === voted[j]){
          newRecords.push(frame[i]);
          console.log("This is inside the fun",newRecords);
          setvoteFrame(newRecords);
          removeFrame(frame[i]._id);
          break;
        }
      }
    }
  };
  useEffect(()=>{
  addvotedFrames();  
  console.log(voteFrame);
},[]);
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
            {frame.map((currElem) => {
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
                          {props.admin ? (
                            <span>{currElem.value[index] !== 0 ? Math.floor((currElem.value[index] / currElem.totalVotes) * 100) : 0}%</span>
                          ) : (
                            <input type="radio" name="options" value={curr} required style={{ color: "blue", width: "30px", height: "50px" }} />
                          )}
                          <h3>{curr}</h3>
                        </div>
                        {props.admin ? (
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
                      {/* <img src={require("../image/edit.png")} alt="edit" width={"35.063rem"} height={"35.063rem"} /> */}
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
          {/* <Container className="Inner_container">
            {voteFrame.map((currElem) => {
              return (
                <div className="inner_form" key={currElem._id}>
                  <h3>{currElem.queryName}</h3>
                  {currElem.optionName.map((curr, index) => {
                    return (
                      <div key={index}>
                        <div className="percent_name_wrap">
                          <span>{currElem.value[index] !== 0 ? Math.floor((currElem.value[index] / currElem.totalVotes) * 100) : 0}%</span>
                          <h3>{curr}</h3>
                        </div>
                        <div className="progress p_inline_bar">
                          <div
                            className="progress-bar inline-progress-bar"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: (currElem.value[index] / currElem.totalVotes) * 100 + "%" }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="bottom_form">
                    <div className="usersPic_voteCount">Total vote: {currElem.totalVotes}</div>
                  </div>
                </div>
              );
            })}
          </Container> */}
        </Container>
      </div>
    </>
  );
};

export default Ahomepage;
