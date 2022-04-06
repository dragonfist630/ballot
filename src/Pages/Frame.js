import "./Ahomepage.css";
import Container from "@mui/material/Container";
import Button from "../UI/Button";
import { useContext, useState, useEffect} from "react";

const Frame = () => {
  return (
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
            {props.admin || !currElem.isvoted ? (
              <div className="checkbox">
                <input type="checkbox" name="vehicle1" required />
                <span>Kindly check this box before submitting</span>
              </div>
            ) : (
              <span></span>
            )}
            <div className="bottom_form">
              <div className="usersPic_voteCount">Total vote: {currElem.totalVotes}</div>
              <div className="EditRemoveIcon_wrap">
                {props.admin ? (
                  <button type="submit">
                    <img src={require("../image/remove.png")} alt="delete" width={"35.063rem"} height={"35.063rem"} />
                  </button>
                ) : !currElem.isvoted ? (
                  <Button text="Vote" display="none" />
                ) : (
                  <span></span>
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
