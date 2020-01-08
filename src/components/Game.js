import React, { useState, useEffect } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'
import AddButton from './AddButton'
import matchService from '../services/matches'
import gameService from '../services/games'

const Game = ({ gameId, setHeader }) => {
  // setHeader(gameId)

  const [matches, setMatches] = useState([])
  const [isModified, setIsModified] = useState(false)
  console.log(gameId)
  
  useEffect(() => {
    matchService
      .getByGame(gameId)
      .then(response => {
        setMatches(response.data)
      })
    gameService
      .getById(gameId)
      .then(response => {
        setHeader(response.data.title)
      })
  }, [])


  const handleSubmit = (players) => {
    const newMatch = {
      id: 3,
      players: players
    }
    const newMatches = [...matches, newMatch]
    console.log(newMatches)
    setMatches(newMatches)
    setIsModified(false)
  }


  return (
    <>
      <AddButton handleClick={() => setIsModified(!isModified)}/>
      {isModified ? <MatchForm handleSubmit={handleSubmit}/> : <Stats matches={matches}/>}
    </>
  )
}

export default Game