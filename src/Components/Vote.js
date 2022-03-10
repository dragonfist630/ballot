import Nav from "../nav";
import React from 'react'
import { Frame } from './Frame'

 const Vote = ({votes,setVote}) => {
      
    return (
      <>
       <Nav logedin="true"/>
       {votes.map((vote) => (     
        <Frame key={vote.id} vote={vote} setVote={setVote}/>
      ))}
      </>
    )
}

export default Vote
