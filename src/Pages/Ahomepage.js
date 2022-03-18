import "./Ahomepage.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import  {useContext}  from "react";
import { APIcontext } from "../API/APIProvider";
// import useEffect from "react";

const Ahomepage = (props) => {
  const [frame, updateFrame] = useContext(APIcontext);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const removeFrame = (id) => {
    const newRecord = frame.filter((currElem) => {
      return currElem.queryId !== id;
    });
    updateFrame(newRecord);
  };
  return (
    <>
      <Nav logedin="true" firstName="Admin" />
      <form onSubmit={handleSubmit} className="Ahomepage_form">
        <Container className="reg" id="Outer_container">
          <div id="add_frame">
            <Link to="/createquery">
              <Button text="Add frame" display="inline" />{" "}
            </Link>
          </div>
          <Container className="Inner_container">
            {frame.map((currElem) => {
              // console.log(currElem.id);
              return (
                <div className="inner_form" key={currElem.queryId}>
                  <h3>{currElem.query}</h3>
                  {currElem.options.map((curr, index) => {
                    return (
                      <div key={currElem.optionsId[index]}>
                        <div className="percent_name_wrap">
                          <span>{Math.floor((currElem.scores[index]/currElem.tVotes)*100)}%</span>
                          <h3>{curr}</h3>
                        </div>
                        <div className="progress p_inline_bar">
                          <div
                            className="progress-bar inline-progress-bar"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: ((currElem.scores[index]/currElem.tVotes)*100) + "%" }}
                          ></div>
                        </div>{" "}
                      </div>
                    );
                  })}
                  <div className="bottom_form">
                    <div className="usersPic_voteCount">
                      <div className="usersPic">
                        {true ? (
                          frame.map((currElem) => {
                            return <img src={require("../image/6144.jpg")} alt="user1" />;
                          })
                        ) : (
                          <span>here</span>
                        )}
                      </div>
                      Total vote: {currElem.tVotes}
                    </div>
                    <div className="EditRemoveIcon_wrap">
                      <img src={require("../image/edit.png")} alt="edit" width={"35.063rem"} height={"35.063rem"} />
                      <img
                        src={require("../image/remove.png")}
                        alt="delete"
                        onClick={() => {
                          removeFrame(currElem.queryId);
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
