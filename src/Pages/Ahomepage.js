import "./Ahomepage.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import  {useContext}  from "react";
import { APIcontext } from "../API/APIProvider";
// import useEffect from "react";

const Ahomepage = (props) => {
  const {vote,userInfos} = useContext(APIcontext);
  const [userInfo,setuserInfo] = userInfos;
  const [frame, updateFrame] = vote;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(userInfo.queryName);
  const removeFrame = (id) => {
    const newRecord = frame.filter((currElem) => {
      return currElem._id !== id;
    });
    updateFrame(newRecord);
  };
  return (
    <>
      <Nav logedin="true" firstName={userInfo.fName} lastName={userInfo.lName}/>
      <form onSubmit={handleSubmit} className="Ahomepage_form">
        <Container className="reg" id="Outer_container">
          <div id="add_frame">
            <Link to="/createquery">
              <Button text="Add frame" display="inline" />
            </Link>
          </div>
          <Container className="Inner_container">
            {frame.map((currElem) => {
              // console.log(currElem.id);
              return (
                <div className="inner_form" key={currElem._id}>
                  <h3>{currElem.queryName}</h3>
                  {currElem.optionName.map((curr, index) => {
                    return (
                      <div key={index}>
                        <div className="percent_name_wrap">
                          <span>{ currElem.value[index] !== 0 ? Math.floor((currElem.value[index]/currElem.totalVotes)*100):0}%</span>
                          <h3>{curr}</h3>
                        </div>
                        <div className="progress p_inline_bar">
                          <div
                            className="progress-bar inline-progress-bar"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: ((currElem.value[index]/currElem.totalVotes)*100) + "%" }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="bottom_form">
                    <div className="usersPic_voteCount">
                      {/* <div className="usersPic">
                        {true ? (
                          frame.map((currElem) => {
                            return <img src={require("../image/6144.jpg")} alt="user1" />;
                          })
                        ) : (
                          <span>here</span>
                        )}
                      </div> */}
                      Total vote: {currElem.totalVotes}
                    </div>
                    <div className="EditRemoveIcon_wrap">
                      {/* <img src={require("../image/edit.png")} alt="edit" width={"35.063rem"} height={"35.063rem"} /> */}
                      <img
                        src={require("../image/remove.png")}
                        alt="delete"
                        onClick={() => {
                          removeFrame(currElem._id);
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
