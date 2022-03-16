import "./App.css";
import Reg from "./reg";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Ahomepage from "./Ahomepage";
import CreateQuery from "./CreateQuery";
import Vote from "./Components/Vote";
import ForgotPass from "./Components/ForgotPass";


// rafce

function App() {
  const votes = [
    {
      id: 1,
      query: "What programming language do you like?",
      options: {
        Python: 20,
        java: 12,
        Javascript: 22,
        C: 300,
        PHP: 20,
      },
      isUserVoted: false,
    },
    {
      id: 2,
      query: "Best IT company to work on?",
      options: {
        Google: 20,
        Oracle: 12,
        Microsoft: 22,
        THBS: 300,
      },
      isUserVoted:true,
  },
  {
    id:3,
    query:"who is more dangerous",
    options:{
        Lion:20,
        Shark:40,
        Mosquitoes:60,
        snake:80,
        Humans:100,
    },
    isUserVoted:false,
}
]

// const [user,setUser] = useState(false);

const [ballot, setBallot] = useState(votes)

  const setVote = async (id) => {
    if (id) {
      const voteon = votes[id - 1];
      console.log(voteon);
      const updatestatus = { ...voteon, isUserVoted: !voteon.isUserVoted };
      console.log(updatestatus.isUserVoted);

    setBallot(
      ballot.map((vote) => 
      vote.id === id ? { ...vote,isUserVoted:updatestatus.isUserVoted } : vote
      )
    )
    console.log(ballot);
   }
   else
   alert("please choose something for vote")
}
  return (
    <div className="background">
      <Routes>
        <Route path="/reg" exact element={<Reg />} />
//         <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Ahomepage />} />
        <Route path="/createquery" element={<CreateQuery />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/allframes" element={<Vote votes={ballot} setVote={setVote} />} />
      </Routes>
<Login/>
    </div>
  );
}

export default App;
