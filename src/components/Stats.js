import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import GridItem from './GridItem'

const mostWins = (matches) => {
  if(!matches)
    return
  
  let playerMap = new Map()
  const winnerArray = matches.map(m => m.winner)
  winnerArray.forEach(w => {
    const wins = playerMap.get(w.player.name)
    if(wins) {
      playerMap.set(w.player.name, wins + 1)
    } else {
      playerMap.set(w.player.name, 1)
    }
  })
  // const matchArray = matches.map(m => m.players)
  // for(let i=0; i < matchArray.length; i++) {
  //   const winner = matchArray[i].reduce((prev, current) => (current.points > prev.points) ? current : prev)
  //   const wins = playerMap.get(winner.player.name)
  //   if(wins) {
  //     playerMap.set(winner.player.name, wins + 1)
  //   } else {
  //     playerMap.set(winner.player.name, 1)
  //   }
  // }
  const result = [...playerMap.entries()].reduce((prev, current) => current[1] > prev[1] ? current : prev, [0,0])
  return {name: result[0], wins: result[1]}
}

const Stats = ({matches}) => {
  const players = matches.map(m => m.players).flat()
  const points = players.map(p => p.points)
  const averagePoints = +(points.reduce((acc, item) => acc + item, 0) / points.length).toFixed(2)
  const mostWinsPlayer = mostWins(matches)
  const mostPointsPlayer = players.length > 0 ? players.reduce((acc, item) => (item.points > acc.points) ? item : acc) : null

  return (
    <>
      <Grid container spacing={2} justify='center'>
        <GridItem title='Games played' value={matches.length}/>
        <GridItem title='Average points' value={averagePoints}/>
        {mostPointsPlayer && 
          <GridItem 
            title='Most points' 
            value={mostPointsPlayer.points}>
            <Typography 
              color='textSecondary'
              variant='body1' 
              component='p'
              align='right'>
              {mostPointsPlayer.player.name}
            </Typography>
          </GridItem>}
        {mostWinsPlayer &&
          <GridItem 
            title='Most wins' 
            value={mostWinsPlayer.wins}>
            <Typography 
              color='textSecondary' 
              variant='body1' 
              component='p'
              align='right'>
              {mostWinsPlayer.name}
            </Typography>
          </GridItem>}
      </Grid>
    </>
  )
}

export default Stats