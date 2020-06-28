import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography, Card, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  item: {
    width: '25em'
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

const StatsGridItem = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.item}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary'>
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default StatsGridItem