import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../GridItem'
import { Typography, List } from '@material-ui/core'
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