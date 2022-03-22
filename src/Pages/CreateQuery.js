import Nav from "../Components/nav";
import "./CreateQuery.css";
import Container from "@mui/material/Container";
import Button from "../UI/Button";
import { useState, useContext } from "react";
import { APIcontext } from "../API/APIProvider";
// import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  const { vote, userInfos } = useContext(APIcontext);
  const [userInfo] = userInfos;
  const [Query, updateQuery] = useState({
    queryName: "",
    optionName: [],
    value: [],
    totalVotes: 0,
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateQuery({ ...Query, [name]: value });
    console.log(Query);
  };
  const fetchFunction = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Query }),
    };
    try {
      const done = await fetch("http://localhost:3000/querys", requestOptions);
      const data = await done.json();
      if (data.message) {
        alert(data.message);        
      }
      if (data.error) {
        alert(data.error);
      }
    } catch (err) {
      alert(err);
    }
  };
  const [options, addOptions] = useState([1, 2]);
  const createOption = () => {
    options.length <= 6 ? addOptions([...options, 1]) : alert("Only 6 Options are allowed!");
  };
  // var arr = [];
  // const arr1 = [];
  const handleSubmit = (e) => {
    e.preventDefault();
    Query.value = [];
    Query.optionName = [];
    for (let i = 0; i < options.length; i++) {
      var temp = document.getElementById(i).value;
      Query.value.push(0);
      Query.optionName.push(temp);
    }
    console.log(Query);
    fetchFunction();
    // updateQuery({ ...Query, queryName: "" });
    // for (let i = 0; i < options.length; i++) {
    //   document.getElementById(i).value = "";
    // }
  };
  const homepage = ["Homepage", "/homepage"];
  return (
    <>
      <Nav logedin="true" firstName={userInfo.fName} homepage={homepage} />
      <Container className="createQuery_wrap">
        <form onSubmit={handleSubmit} className="createQuery_form">
          <p>
            Query<span>(500 characters only!)</span>
          </p>
          <input
            type="text"
            placeholder="Input your question here"
            required
            autoComplete="off"
            value={Query.queryName}
            name="queryName"
            onChange={handleInput}
          />
          <p>
            Options<span>(150 characters only!)</span>
          </p>
          <div className="optionsButton_wrap">
            <div className="optionWrap">
              {options.map((currElem, Index) => {
                //value={Query.optionName[Index]} name={Query.optionName[Index]}
                return <input type="text" placeholder="Input your option here" id={Index} required autoComplete="off" name={Index} />;
              })}
            </div>
            <div onClick={createOption} id="buttonWrap">
              <Button text="Options" />
            </div>
          </div>
          <div className="submitButton">
            <Button display="none" text="Submit" />
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreateQuery;
