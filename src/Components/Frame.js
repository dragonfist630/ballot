import "./framestyle.css";
import "../Pages/Ahomepage.css";
// import Button from "../UI/Button";
// import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "@mui/material/Container";
export const Frame = ({ vote, setVote }) => {
  var sum = 0;
  const options = Object.entries(vote.options);
  options.forEach((element) => {
    sum = sum + element[1];
  });
  // console.log(sum);
  // var handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  return (
    <Container className="single-frame Ahomepage_form inner_form">
      <h3 className="frame-query">{vote.query}</h3>
      {options.map((opt) => {
        return (
          <>
            <div style={{ display: "flex", flexDirection: "row",marginTop:"",padding:"0%" }}>
              {vote.isUserVoted ? (
                <>
                  <h5 className="frame-query" style={{ fontSize: "24px", marginRight: "40px" }}>
                    {((opt[1] / sum) * 100).toFixed(0)}%
                  </h5>
                </>
              ) : (
                <input type="radio" name="inputoption" value={opt[0]} style={{ color: "blue", width: "30px", height: "50px", marginRight: "30px" }} />
              )}

              <h3 className="frame-query" style={{ fontSize: "32px" }}>
                {opt[0]}{" "}
              </h3>
              <br></br>
            </div>
            {vote.isUserVoted ? (
              <>
                <div id="progress">
                  <div id="progress-bar" style={{ width: `${((opt[1] / sum) * 100).toFixed(1)}%` }}></div>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        );
      })}
      <div style={{ display: "flex", displayDirection: "row" }}>
        <p className="total-votes">Total votes: {sum}</p>
        {
            vote.isUserVoted ? <p style={{float:"right",marginLeft:"max",color:"red",fontSize:"medium"}}>voted</p> : <button className="button-btn " style={{float:"right",marginLeft:"30%"}} onClick={() =>{
                    try {
                        const choosedoption = document.querySelector('input[name="inputoption"]:checked').value
                        setVote(vote.id,choosedoption)
                    } catch (error) {
                        alert("please choose any option to proceed")
                    }
                   
                }
            }>Vote</button> }
      </div>
    </Container>
  );
};
