import React, { useState, useEffect } from 'react'
import { Bar, Pie, StackedBar, Line } from 'react-roughviz'
import Grid from '@material-ui/core/Grid'
import { Typography, Card, CardContent } from '@material-ui/core'
import playerService from '../services/players'

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

const Stats = ({ matches }) => {
  const [mostPointsPlayer, setMostPointsPlayer] = useState(null)
  const players = matches.map(m => m.players).flat()
  const points = players.map(p => p.points)
  const averagePoints = +(points.reduce((acc, item) => acc + item, 0) / points.length).toFixed(2)
  const playerWithMostPoints = players.reduce((acc, item) => (item.points > acc.points) ? item : acc, {points: 0})
  
  useEffect(() => {
    if(!playerWithMostPoints.player)
      return
      
    playerService
      .getById(playerWithMostPoints.player)
      .then(response => {
        setMostPointsPlayer({...playerWithMostPoints, name:response.data.name})
      })
      .catch(error => {
        console.log('failed to fetch player data', error)
      })
  }, [playerWithMostPoints])
  
  return (
    <>
      <Grid container spacing={2} justify='center'>
        <GridItem title='Average points' value={averagePoints} />
        {mostPointsPlayer && 
          <GridItem title='Most points' value={mostPointsPlayer.points}>
            <Typography color="textSecondary">
              {mostPointsPlayer.name}
            </Typography>
          </GridItem>}
      </Grid>
    </>
  )
}

export default Stats