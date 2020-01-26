import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../GridItem'

const UserStats = ({ matches, playerId }) => {

  const wins = () => {
    const playersArray = matches.map(m => m.players)
    let wins = 0
    let winner

    for (let i = 0; i < playersArray.length; i++) {
      winner = playersArray[i].reduce((prev, current) => (current.points > prev.points) ? current : prev)
      if (winner.player.id === playerId) {
        wins++
      }
    }

    return wins
  }

  const totalWins = wins()
  const winPercentage = +(totalWins / matches.length * 100).toFixed(1)

  return (
    <>
      <Grid container spacing={2} justify='center' style={{ marginBottom: '0.35em' }}>
        <GridItem title='Matches total' value={matches.length} />
        <GridItem title='Wins total' value={totalWins} />
        <GridItem title='Overall win %' value={winPercentage && `${winPercentage} %`} />
      </Grid>
    </>
  )
}

export default UserStats