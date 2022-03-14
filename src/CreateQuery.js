import React from "react";
import Nav from "./nav";
import "./CreateQuery.css";
import Container from "@mui/material/Container";
import Button from "./UI/Button";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  const [options, addOptions] = useState([1, 2]);
  const createOption = () =>{ options.length<6 ? addOptions([...options, 1]): alert("Only 6 Options are allowed!")}
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const homepage = ["Homepage", "/homepage"]
  return (
    <>
      <Nav logedin="true" firstName="A" homepage={homepage} />
      <Container className="createQuery_wrap">
        <form onSubmit={handleSubmit} className="createQuery_form">
          <p>
            Query<span>(500 characters only!)</span>
          </p>
          <input type="text" placeholder="Input your question here" required autoComplete="off" name="firstName" />
          <p>
            Options<span>(150 characters only!)</span>
          </p>
          <div className="optionsButton_wrap">
              <div className="optionWrap">
          {options.map((currElem) => {
            return (
                <input type="text" placeholder="Input your option here" required autoComplete="off" name="secondName" />
                );
            })}
            </div>
          <div onClick={createOption} id="buttonWrap">
              <Button text="Options"/>
          </div>
          </div>
          <div className="submitButton">
          <Button display="none" text="Submit"/>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreateQuery;
