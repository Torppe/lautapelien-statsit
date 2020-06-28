import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../GridItem'
import statsService from '../../services/stats'


const UserStats = ({ matches, playerId }) => {
  if(!matches || matches.length < 1)
    return null

  const totalWins = statsService.winsByPlayer(matches, playerId)
  const winPercentage = statsService.playerWinPercentage(matches, totalWins)

  return (
    <>
      <Grid container spacing={2} justify='center' style={{ marginBottom: '0.35em' }}>
        <GridItem title='Matches' value={matches.length} />
        <GridItem title='Wins' value={totalWins} />
        <GridItem title='Win %' value={winPercentage && `${winPercentage} %`} />
      </Grid>
    </>
  )
}

export default UserStats