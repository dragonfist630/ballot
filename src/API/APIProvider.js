import React, { createContext, useState } from "react";

export const APIcontext = createContext();

export const APIProvider = props => {
    const [vote, setVote] = useState([
        {
          queryId: 0,
          query: "Which programming languages you like?",
          options: ["Python", "Java", "Javascript", "C#"],
          optionsId:['q0p0','q0p1','q0p2','q0p3'],
          scores: [50, 30, 82, 30],
          tVotes: 192,
        },
        {
          queryId: 1,
          query: "Which Company you think is best?",
          options: ["Google", "Oracle", "Tata", "Ford", "Infosys"],
          optionsId:['q0p0','q0p1','q0p2','q0p3'],
          scores: [75, 65, 40, 30, 60],
          tVotes: 270,
        },
        {
          queryId: 2,
          query: "Which programming languages you like?",
          options: ["Python", "Java", "Javascript", "C#"],
          optionsId:['q0p0','q0p1','q0p2','q0p3'],
          scores: [50, 30, 82, 30],
          tVotes: 192,
        },
      ]);
  return <APIcontext.Provider value={[vote,setVote]}>{props.children}</APIcontext.Provider>;
};
