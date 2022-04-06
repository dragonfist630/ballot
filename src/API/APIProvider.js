import React, { createContext, useState, useEffect } from "react";

export const APIcontext = createContext();

export const APIProvider = (props) => {
  console.log('Just inside context API.');
  const [vote, setVote] = useState([
    // {
    //   _id: 0,
    //   queryName: "Which programming languages you like?",
    //   optionName: ["Python", "Java", "Javascript", "C#"],
    //   value: [50, 30, 82, 30],
    //   totalVotes: 192,
    // },
    // {
    //   _id: 1,
    //   queryName: "Which Company you think is best?",
    //   optionName: ["Google", "Oracle", "Tata", "Ford", "Infosys"],
    //   value: [75, 65, 40, 30, 60],
    //   totalVotes: 270,
    // },
    // {
    //   _id: 2,
    //   queryName: "Which programming languages you like?",
    //   optionName: ["Python", "Java", "Javascript", "C#"],
    //   value: [50, 30, 82, 30],
    //   totalVotes: 192,
    // },
  ]);
  const [userInfo, setuserInfo] = useState({ userId: "", fName: " ", lName: " ", querName: [] });
  // console.log(userInfo.userId);
  var frame = []
  const fetchFunction = async () => {
    frame=[];
    try {
      const done = await fetch("https://ballotdb.herokuapp.com/getquery");
      const data = await done.json();
      setTimeout(() => {
        // setVote([...data]);
        frame.push(...data);
        console.log("Inside the fun which fetch the frame data", frame);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFunction();
  }, []);
  return <APIcontext.Provider value={{ vote: frame, userInfos: [userInfo, setuserInfo], fetchframe: fetchFunction }}>{props.children}</APIcontext.Provider>;
};
