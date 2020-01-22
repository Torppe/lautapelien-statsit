import React, { useState, useEffect } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'
import AddButton from './AddButton'
import matchService from '../services/matches'
import gameService from '../services/games'

const Game = ({ gameId, setHeader, user }) => {
  const [matches, setMatches] = useState([])
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const results = await matchService.getByGame(gameId)
        setMatches(results)
        } catch(error) {
        console.log('failed to get match data', error)
      }
    }
    const fetchHeader = async () => {
      try {
        const result = await gameService.getById(gameId)
        setHeader(result)
      } catch(error) {
        console.log('failed to fetch header', error)
      }
    }

    fetchGame()
    fetchHeader()
  }, [gameId, setHeader])

  const handleSubmit = async (newPlayers) => {
    const newMatch = {
      game: gameId,
      players: newPlayers
    }
    
    try {
      const result = await matchService.create(newMatch)
      setMatches([...matches, result])
      setIsModified(false)
    } catch (error) {
      console.log('failed to create a new match', error)
    }
  }

  return (
    <>
      {user && <AddButton handleClick={() => setIsModified(!isModified)}/>}
      {user && isModified ? <MatchForm handleSubmit={handleSubmit}/> : <Stats matches={matches}/>}
    </>
  )
}

export default Game