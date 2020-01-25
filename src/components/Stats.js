import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography, Card, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  item: {
    width: '11.5em'
  },
  cardContent: {
    padding: '0.4em 0.8em 0 1em',
    '&:last-child': {
      paddingBottom: '0.5em'
    }
  },
  card: {
    borderRadius: '10px'
  },
  title: {
    fontSize: '1.8em',
    lineHeight: '1.25em',
    paddingBottom: '0.3em'
  },
})

const GridItem = (props) => {
  const {title, value, classes} = props
  if(!title || !value)
    return null
  
  return (
    <Grid item className={classes.item}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary'>
            {title}
          </Typography>
          <Typography align='right' variant='h4' component='h2'>
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
  const classes = useStyles()
  
  const players = matches.map(m => m.players).flat()
  const points = players.map(p => p.points)
  const averagePoints = +(points.reduce((acc, item) => acc + item, 0) / points.length).toFixed(2)
  const mostWinsPlayer = mostWins(matches)
  const mostPointsPlayer = players.length > 0 ? players.reduce((acc, item) => (item.points > acc.points) ? item : acc) : null

  return (
    <>
      <Grid container spacing={2} justify='center'>
        <GridItem title='Games played' value={matches.length} classes={classes}/>
        <GridItem title='Average points' value={averagePoints} classes={classes}/>
        {mostPointsPlayer && 
          <GridItem 
            title='Most points' 
            value={mostPointsPlayer.points} 
            classes={classes}>
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
            value={mostWinsPlayer.wins}
            classes={classes}>
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