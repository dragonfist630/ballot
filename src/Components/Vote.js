import Nav from "../nav";
import React from 'react'
import { Frame } from './Frame'

 const Vote = ({votes,setVote}) => {
      
    return (
      <>
       <Nav logedin="" firstName="Nayan" lastName="Gadhari" />
       {votes.map((vote) => (     
        <Frame key={vote.id} vote={vote} setVote={setVote}/>
      ))}
      </>
    )
}

export default Vote
