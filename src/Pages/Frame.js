import "./Ahomepage.css";
import Button from "../UI/Button";
import Container from "@mui/material/Container";
import { useEffect, useState, useCallback, useContext,useMemo} from "react";
import { APIcontext } from "../API/APIProvider";
import {useNavigate} from "react-router-dom";

const Frame = ({admin,temparray,usercred}) => {
  const{funcs} = useContext(APIcontext);
  let navigate = useNavigate();
  const userInfo = usercred;
  const Temparray = temparray;
  const [frame, setFrame] = useState([]);
  //creating new frame data in new variable
  var tempVotes = useMemo(()=>[]);
  //emptying the queryObject which is in API
  funcs("","",[],[],"");
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
        // var millisecondsToWait = 1000;
        if (responseData.error) {
          // setTimeout(function () {
          alert(responseData.error);
          // }, millisecondsToWait);
        } else {
          // setTimeout(function () {
          // alert(responseData.message);
          // }, millisecondsToWait);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [userInfo]
  );
  const deleteQuery = useCallback(async (id) => {
    const deleteObject = {
      mode: "cors",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: id }),
    };
    try {
      const data = await fetch("https://ballotdb.herokuapp.com/deleteQuery", deleteObject);
      const response = await data.json()
      if(response.error){
        console.log(response.error);
      }
      if(response.message){
        console.log(response.message);
        // console.log("This id is deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //function to remove frame
  const removeFrame = (id) => {
    const newRecord = frame.filter((currElem) => {
      return currElem._id !== id;
    });
    deleteQuery(id);
    setFrame(() => [...newRecord]);
  };
  //changing the frame for voted
  const changevoted = useCallback(() => {
    // console.log("Inside chnangevoted() Temparray", Temparray);
    for (let i = 0; i < Temparray.length; i++) {
      for (let j = 0; j < tempVotes.length; j++) {
        if (tempVotes[j]._id === Temparray[i]) {
          const temp = { isvoted: true };
          tempVotes[j] = Object.assign(tempVotes[j], temp);
          break;
        }
      }
    }
    // console.log("Before state change tempVotes=", tempVotes);
    setFrame((preState) => (preState = tempVotes));
    // console.log("After state change frame=", frame);
  }, [tempVotes, Temparray]);
  //getting frame from backend
  const fetchFrame = useCallback( async () => {
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/getquery");
      const data = await done.json();
      tempVotes.push(...data);
      setTimeout(() => {
        // console.log("Inside fetchFrame ", data);
        changevoted();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  },[tempVotes,changevoted]);
  // trigers after vote is submitted.
  const handleSubmit = (id) => {
    if (admin) {
      removeFrame(id);
    } else {
      Temparray.push(id);
      // console.log("handleSubmit(), just after Temparray is updated", Temparray);
      fetchFrame();
      sendVote(id);
    }
  };
  const editFrame = (id,queryName,options,value) => {
    // console.log(id,queryName,options,value);
    funcs(id,queryName,options,value);
    navigate('/createquery');
  };
  useEffect(() => {
    // console.log("Use effect has ran from frame.Js");
    fetchFrame();
  }, [fetchFrame]);
  const blankSpan = <span></span>;
  const checkBox = (
    <div className="checkbox">
      <input type="checkbox" name="vehicle1" required />
      <span>Kindly check this box before submitting</span>
    </div>
  );
  return (
    <Container>
      {frame.map((currElem,Index) => {
        return (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(currElem._id);
             }}
            className="inner_form"
            key={Index}
          >
            <h3>{currElem.queryName}</h3>
            {currElem.optionName.map((curr, index) => {
              return (
                <div key={index}>
                  <div className="percent_name_wrap">
                    {admin || currElem.isvoted ? (
                      <span>{currElem.value[index] !== 0 ? Math.floor((currElem.value[index] / currElem.totalVotes) * 100) : 0}%</span>
                    ) : (
                      <input type="radio" name="options" value={curr} required style={{ color: "blue", width: "30px", height: "50px" }} />
                    )}
                    <h3>{curr}</h3>
                  </div>
                  {admin || currElem.isvoted ? (
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
            {admin || !currElem.isvoted ? checkBox : blankSpan}
            <div className="bottom_form">
              <div className="usersPic_voteCount">Total vote: {currElem.totalVotes}</div>
              <div className="EditRemoveIcon_wrap">
                {admin ? (
                  <>
                    <button
                      onClick={() => {
                        editFrame(currElem._id,currElem.queryName,currElem.optionName,currElem.value);
                      }}
                    >
                      <img src={require("../image/edit.png")} alt="edit" width={"35.063rem"} height={"35.063rem"} />
                    </button>
                    <button type="submit">
                      <img src={require("../image/remove.png")} alt="delete" width={"35.063rem"} height={"35.063rem"} />
                    </button>
                  </>
                ) : !currElem.isvoted ? (
                  <Button text="Vote" display="none" width="15rem" />
                ) : (
                  blankSpan
                )}
              </div>
            </div>
          </form>
        );
      })}
    </Container>
  );
};

export default Frame;
