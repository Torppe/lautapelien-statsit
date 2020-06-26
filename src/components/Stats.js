import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import GridItem from './GridItem'
import statsService from '../services/stats'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const Stats = ({matches}) => {
  const players = matches.map(m => m.players).flat()
  const points = players.map(p => p.points)
  const averagePoints = statsService.averagePoints(points)
  const mostWinsPlayer = statsService.playerWithMostWins(matches)
  const mostPointsPlayer = statsService.playerWithMostPoints(players)
  // const playerPerformance = statsService.playerPerformance(players)

  return (
    <>
      <Typography component='h2' variant='h4' align='center' style={{marginBottom: '1em'}}>
        Overall stats
      </Typography>
      <Grid container spacing={2} justify='center'>
        {matches.length < 1 && <em>no matches</em>}
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