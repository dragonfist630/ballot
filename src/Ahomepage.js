import "./Ahomepage.css";
// import "./reg.css";
import Button from "./UI/Button";
import Nav from "./nav";
import Container from "@mui/material/Container";
import { useState } from "react";

const Ahomepage = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [frame, updateFrame] = useState([
    {
      id: 0,
      query: "Which programming languages you like?",
      options: ["Python", "Java", "Javascript", "C#"],
      scores: [50, 30, 82, 30],
      tVotes: 25,
    },
    {
      id: 1,
      query: "Which Company you think is best?",
      options: ["Google", "Oracle", "Tata", "Ford", "Infosys"],
      scores: [75, 65, 40, 30, 60],
      tVotes: 45,
    },
    {
      id: 2,
      query: "Which programming languages you like?",
      options: ["Python", "Java", "Javascript", "C#"],
      scores: [50, 30, 82, 30],
      tVotes: 25,
    },
  ]);
  const removeFrame = (id) => {
    const newRecord = frame.filter((currElem) => {
      return currElem.id !== id;
    });
    updateFrame(newRecord);
  };
  return (
    <>
      <Nav logedin="true" />
      <form onSubmit={handleSubmit} className="Ahomepage_form">
        <Container className="reg" id="Outer_container">
          <div id="add_frame">
            <Button text="Add frame" display="inline" />{" "}
          </div>
          <Container className="Inner_container">
            {frame.map((currElem) => {
              // console.log(currElem.id);
              return (
                <div className="inner_form" key={currElem.id}>
                  <h3>{currElem.query}</h3>
                  {currElem.options.map((curr, index) => {
                    return (
                      <div key={index}>
                        <div className="percent_name_wrap">
                          <span>{currElem.scores[index]}%</span>
                          <h3>{curr}</h3>
                        </div>
                        <div className="progress p_inline_bar">
                          <div
                            className="progress-bar inline-progress-bar"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: currElem.scores[index] + "%" }}
                          ></div>
                        </div>{" "}
                      </div>
                    );
                  })}
                  <div className="bottom_form">
                    <div className="usersPic_voteCount">
                      <div className="usersPic">
                        {true ? frame.map((currElem)=>{return <img src={require("./image/6144.jpg")} alt="user1" />}) : <span>here</span>}
                      </div>
                      Total vote: {currElem.tVotes}
                    </div>
                    <div className="EditRemoveIcon_wrap">
                      <img src={require("./image/edit.png")} alt="edit" width={"35.063rem"} height={"35.063rem"} />
                      <img
                        src={require("./image/remove.png")}
                        alt="delete"
                        onClick={() => {
                          removeFrame(currElem.id);
                        }}
                        width={"35.063rem"}
                        height={"35.063rem"}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Container>
        </Container>
      </form>
    </>
  );
};

export default Ahomepage;
