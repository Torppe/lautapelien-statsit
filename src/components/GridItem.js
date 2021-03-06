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

const GridItem = ({ title, value, titleStyle, itemWidth, children, hideValue }) => {
  const classes = useStyles()
  const itemStyle = { 
    width: itemWidth ? itemWidth : '11.5em'
  }

  if(!title || !value)
    return null

  return (
    <Grid item style={itemStyle}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary' style={titleStyle}>
            {title}
          </Typography>
          <Typography align='right' variant='h4' component='h2'>
            {value}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default GridItem