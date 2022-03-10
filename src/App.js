import "./App.css";
import Reg from "./reg";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Ahomepage from "./Ahomepage";
import Vote from "./Components/Vote";

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
      isUserVoted: true,
    },
  ];

  const [ballot, setBallot] = useState(votes);

  const setVote = async (id) => {
    if (id) {
      const voteon = votes[id - 1];
      console.log(voteon);
      const updatestatus = { ...voteon, isUserVoted: !voteon.isUserVoted };
      console.log(updatestatus.isUserVoted);

      setBallot(ballot.map((vote) => (vote.id === 1 ? { ...vote, isUserVoted: updatestatus.isUserVoted } : vote)));
      console.log(ballot);
    } else alert("please choose something for vote");
  };
  return (
    <div className="background">
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Ahomepage />} />
        <Route path="/allframes" element={<Vote votes={ballot} setVote={setVote} />} />
      </Routes>
    </div>
  );
}

export default App;
