import React, { useState, useEffect } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'
import AddButton from './AddButton'
import matchService from '../services/matches'
import gameService from '../services/games'

const Game = ({ gameId, setHeader }) => {
  const [matches, setMatches] = useState([])
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    matchService
      .getByGame(gameId)
      .then(response => {
        setMatches(response.data)
      })
      .catch(error => {
        console.log('failed to get match data', error)
      })
    gameService
      .getById(gameId)
      .then(response => {
        setHeader(response.data.title)
      })
  }, [gameId, setHeader])

  const handleSubmit = (newPlayers) => {
    const newMatch = {
      game: gameId,
      players: newPlayers
    }

    matchService
      .create(newMatch)
      .then(response => {
        setMatches([...matches, response.data])
        setIsModified(false)
      })
      .catch(error => {
        console.log('failed to create a new match', error)
      })
  }

  return (
    <>
      <AddButton handleClick={() => setIsModified(!isModified)}/>
      {isModified ? <MatchForm handleSubmit={handleSubmit}/> : <Stats matches={matches}/>}
    </>
  )
}

export default Game