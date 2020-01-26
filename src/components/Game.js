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
        setHeader(result.title)
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

  const userContent = () => {
    if(!user)
      return null

    return(
      <>
        {isModified ? 
          <MatchForm handleSubmit={handleSubmit} handleCloseForm={() => setIsModified(false)}/> 
          : <AddButton handleClick={() => setIsModified(true)}/>}
      </>
    )
  }

  return (
    <>
      {!isModified && <Stats matches={matches}/>}
      {userContent()}
    </>
  )
}

export default Game