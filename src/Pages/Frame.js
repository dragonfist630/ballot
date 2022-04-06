import "./Ahomepage.css";
import Button from "../UI/Button";
import Container from "@mui/material/Container";
import { useEffect, useState, useCallback } from "react";

const Frame = (props) => {
  const userInfo = props.usercred;
  const temparray = props.temparray;
  const [frame, setFrame] = useState([]);
  //creating new frame data in new variable
  var tempVotes = [];
  //getting frame from backend
  const fetchFrame = async () => {
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/getquery");
      const data = await done.json();
      setFrame(() => {
        return [...data];
      });
      tempVotes.push(...data);
      setTimeout(() => {
        console.log("Inside fetchFrame just after setFrame", frame, data);
      }, 1600);
    } catch (err) {
      console.log(err);
    }
  };
//   const fetchcastedVotes = useCallback(async () => {
//     const requestOptions = {
//       mode: "cors",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ myId: userInfo }),
//     };
//     try {
//       const done = await fetch("https://ballotdb.herokuapp.com/getvotedquery", requestOptions);
//       const data = await done.json();
//       temparray.push(...data);
//       console.log("When we get data from API", temparray, data);
//     } catch (err) {
//       console.log(err);
//     }
//   }, [userInfo, temparray]);
  //called to send vote.
  const sendVote = useCallback(
    async (id) => {
      var voteChecked = document.querySelector('input[name="options"]:checked').value;
      const requestOptions = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userInfo, queryName: id, optionName: voteChecked }),
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
          }, millisecondsToWait);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [userInfo.userId]
  );

  //function to remove frame
  const removeFrame = (id) => {
    const newRecord = frame.filter((currElem) => {
      return currElem._id !== id;
    });
    setFrame(() => [...newRecord]);
  };
  //changing the frame for voted
  const changevoted = useCallback(() => {
    console.log("Inside chnangevoted()", temparray);
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
    setFrame(tempVotes);
    console.log("Just after the for loop", frame);
  }, [tempVotes, temparray]);
  // trigers after vote is submitted.
  const handleSubmit = (id) => {
    if (props.admin) {
      removeFrame(id);
    } else {
    //   temparray.push(id);
    //   changevoted();
      sendVote(id);
    }
  };
  useEffect(() => {
    console.log("Use effect has ran from frame.Js");
    // fetchcastedVotes();
    fetchFrame();
    setTimeout(() => {
      changevoted();
    }, 2000);
  }, []);
  const blankSpan = <span></span>;
  const checkBox = (
    <div className="checkbox">
      <input type="checkbox" name="vehicle1" required />
      <span>Kindly check this box before submitting</span>
    </div>
  );
  const deleteButton = (
    <button type="submit">
      <img src={require("../image/remove.png")} alt="delete" width={"35.063rem"} height={"35.063rem"} />
    </button>
  );
  return (
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
                    blankSpan
                  )}
                </div>
              );
            })}
            {props.admin || !currElem.isvoted ? checkBox : blankSpan}
            <div className="bottom_form">
              <div className="usersPic_voteCount">Total vote: {currElem.totalVotes}</div>
              <div className="EditRemoveIcon_wrap">
                {props.admin ? deleteButton : !currElem.isvoted ? <Button text="Vote" display="none" /> : blankSpan}
              </div>
            </div>
          </form>
        );
      })}
    </Container>
  );
};

export default Frame;
