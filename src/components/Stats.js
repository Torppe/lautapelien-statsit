import React, { useState, useEffect, useMemo }  from 'react'
import { Bar, Pie, StackedBar, Line } from 'react-roughviz'
import Grid from '@material-ui/core/Grid'
import { Typography, Card, CardContent } from '@material-ui/core'

const GridItem = (props) => {
  const {title, value} = props
  if(!title || !value)
    return null

  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            {value}
          </Typography>
          {props.children}
        </CardContent>
      </Card>
    </Grid>
  )
}

const mostWins = (matches) => {
  if(!matches)
    return
  
  const matchArray = matches.map(m => m.players)
  let playerMap = new Map()
  for(let i=0; i < matchArray.length; i++) {
    const winner = matchArray[i].reduce((prev, current) => (current.points > prev.points) ? current : prev)
    const wins = playerMap.get(winner.player.name)
    if(wins) {
      playerMap.set(winner.player.name, wins + 1)
    } else {
      playerMap.set(winner.player.name, 1)
    }
  }
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
        <GridItem title='Average points' value={averagePoints} />
        {mostPointsPlayer && 
          <GridItem title='Most points' value={mostPointsPlayer.points}>
            <Typography color="textSecondary">
              {mostPointsPlayer.player.name}
            </Typography>
          </GridItem>}
        {mostWinsPlayer &&
          <GridItem title='Most wins' value={mostWinsPlayer.wins}>
            <Typography color="textSecondary">
              {mostWinsPlayer.name}
            </Typography>             
          </GridItem>}
      </Grid>
    </>
  )
}

export default Stats