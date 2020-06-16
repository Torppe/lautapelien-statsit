import React, { useEffect, useState } from 'react'
import playerService from '../../services/players'
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
// import { List } from '@material-ui/core'
// import ListItemLink from '../ListItemLink'

const useStyles = makeStyles({
  item: {
    width: '11.5em'
  },
  cardContent: {
    bottom: 0,
    position: 'absolute',
    padding: '0.4em 0.8em 0 1em',
    "&:last-child": {
      paddingBottom: '0.5em'
    }
  },
  card: {
    position: 'relative',
    borderRadius: '10px',
    height: '10em'
  },
  input: {
    backgroundColor: 'white',
  }
})

const Users = ({ setHeader }) => {
  setHeader('Players')
  const [players, setPlayers] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const fetchPlayers = async () => {
      const results = await playerService.getAll()
      setPlayers(results)
    }
    try {
      fetchPlayers()
    } catch (error) {
      console.log('failed to fetch player data')
    }
  }, [])

  return (
    <>
      <Grid container spacing={2} justify='center'>
        {players.map(p =>
          <Grid
            key={p.id}
            item
            className={classes.item}>
            <Link to={`/player-stats/${p.id}`}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography align='left' style={{ fontSize: '1.2em' }}>
                    {p.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )}
      </Grid>
      {/* <List disablePadding>
        {players.map(p => <ListItemLink key={p.id} to={`/player-stats/${p.id}`} primary={p.name} />)}
      </List> */}
    </>
  )
}

export default Users