import Nav from "../Components/nav";
import "./CreateQuery.css";
import Container from "@mui/material/Container";
import Button from "../UI/Button";
import { useState, useContext, useRef, useEffect } from "react";
import { APIcontext } from "../API/APIProvider";
import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  const { funcs, object } = useContext(APIcontext);
  const queryName = useRef();
  const optionArray = useRef([]);
  let navigate = useNavigate();
  const fName = window.localStorage.getItem("fName");
  const lName = window.localStorage.getItem("lName");
  const fetchFunction = async (Query) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Query }),
    };
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/querys", requestOptions);
      const data = await done.json();
      if (data.message) {
        // console.log("This is inside fetchfunction",requestOptions.body);
        navigate("/homepage");
      }
      if (data.error) {
        alert(data.error);
      }
    } catch (err) {
      alert(err);
    }
  };
  const editFrame = async(Query) =>{
    const editObject = {
      mode: "cors",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...Query}),
    };
    try{
      const data = await fetch("https://ballotdb.herokuapp.com/editQuery",editObject)
      const response = await data.json();
      // console.log("This is sent to DB,",editObject.body);
      if(response.error){
        console.log(response.error);
      }
      if(response.message){
        console.log(response.message);
        navigate('/homepage');
      }
    }catch(error){
      console.log(error)
    }
  };
  const [options, addOptions] = useState([0, 1]);
  let [message, setmessage] = useState(false);
  const createOption = (e) => {
    if (e === undefined) {
      options.length < 6 ? addOptions((preState)=>[...options, preState.lenght]) : setmessage(true);
    } else {
      e.preventDefault();
      options.length < 6 ? addOptions([...options, 1]) : setmessage(true);
    }
  };
  var qryName = undefined;
  const optionName = [];
  const value = [];
  const totalVotes = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    qryName = queryName.current.value;
    for (let i = 0; i < options.length; i++) {
      optionName.push(document.getElementById(`${i}`).value);
      value.push(0);
    }
    if (object.id === "") {
      const Query = { queryName: qryName, optionName: optionName, value: value, totalVotes: totalVotes };
      // console.log(Query);
      fetchFunction(Query);
    }else{
      const Query = {queryId:object.id, queryName: qryName, optionName: optionName, value: object.value};
      // console.log("This will go for updating",Query);
      object.queryName = "";
      object.optionName = [];
      object.value = [];
      object.id = "";
      editFrame(Query);
    }
  };
  const arrayforOption = [];
  const runatStart = () => {
    if (object.optionName.length !== 0) {
      queryName.current.value = object.queryName;
      for (let j = 0; j < object.optionName.length; j++) {
        arrayforOption.push(j);
      }
      addOptions(arrayforOption);
      setTimeout(() => {
        object.optionName.map((currElem, i) => {
          document.getElementById(i).value = currElem;
        });
      }, 1000);
    }
  };
  useEffect(() => {
    runatStart();
  }, []);
  const homepage = ["Homepage", "/homepage"];
  return (
    <>
      <Nav logedin="true" firstName={fName} lastName={lName} homepage={homepage} />
      <Container className="createQuery_wrap">
        <form onSubmit={handleSubmit} className="createQuery_form">
          <p>
            Query<span>(500 characters only!)</span>
          </p>
          <input type="text" placeholder="Input your question here" required autoComplete="off" name="queryName" ref={queryName} />
          <p>
            Options<span>(150 characters only!)</span>
            {message && <span style={{ color: "red", fontSize: "2rem" }}>*Only 6 options are allowed*</span>}
          </p>
          <div className="optionsButton_wrap">
            <div className="optionWrap">
              {options.map((currElem, Index) => {
                return <input type="text" placeholder="Input your option here" id={Index} required autoComplete="off" key={Index}/>;
              })}
            </div>
            <div onClick={createOption} id="buttonWrap">
              <Button text="Options" width="16rem" />
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
