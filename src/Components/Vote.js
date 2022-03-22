import Nav from "./nav";
import React, {useContext} from 'react';
import { APIcontext } from "../API/APIProvider";
import { Frame } from './Frame';

  const Vote = ({votes,setVote}) => {
  const {vote,userInfos} = useContext(APIcontext);
  const [userInfo] = userInfos;
  console.log(userInfo.firstName);
    return (
      <>
       <Nav logedin="" firstName={userInfo.fName} lastName={userInfo.lName} />
       {votes.map((vote) => (     
        <Frame key={vote.id} vote={vote} setVote={setVote}/>
      ))}
      </>
    )
}

export default Vote;
