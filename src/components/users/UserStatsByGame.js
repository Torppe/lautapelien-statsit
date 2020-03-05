import React from 'react'
import UserStats from './UserStats'

const UserStatsByGame = ({ matches, playerId, gameId }) => {
  const matchesByGame = () => {
    return matches.filter(m => m.game.id === gameId)
  }

  return (
    <>
      <UserStats matches={matchesByGame()} playerId={playerId}/>
    </>
  )
}

export default UserStatsByGame