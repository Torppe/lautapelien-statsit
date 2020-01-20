import React, { useState } from 'react'
import { TextField, Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AddButton from './AddButton'
import gameService from '../services/games'

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
})

const AddGame = ({ value, handleGameChange, handleAddGame }) => {
  return (
    <form onSubmit={handleAddGame}>
      <TextField id='new-game' label='Add game' variant='outlined' color='secondary' autoFocus value={value} onChange={handleGameChange} />
    </form>
  )
}

const Games = ({ games, setGames }) => {
  const classes = useStyles()
  const [newGame, setNewGame] = useState(null)
  const [isModifying, setIsModifying] = useState(false)

  const handleAddGame = async (event) => {
    event.preventDefault()

    const newObject = {
      title: newGame
    }

    gameService
      .create(newObject)
      .then(response => {
        setGames([...games, response.data])
        setIsModifying(false)
        setNewGame('')
      })
      .catch(error => {
        console.log('failed to create game')
      })
  }

  const handleClick = () => {
    setIsModifying(!isModifying)
    setNewGame('')
  }

  const handleGameChange = (event) => {
    setNewGame(event.target.value)
  }

  return (
    <>
      <Grid container spacing={2} justify='center'>
        {games.map(g =>
            <Grid 
              key={g.id} 
              item
              className={classes.item}>
              <Link to={`/game-stats/${g.id}`}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography align='left' style={{fontSize: '1.2em'}}>
                        {g.title}
                      </Typography>
                    </CardContent>
                </Card>
              </Link>
            </Grid>
        )}
      </Grid>
      {isModifying && <AddGame value={newGame} handleGameChange={handleGameChange} handleAddGame={handleAddGame} />}
      <AddButton handleClick={handleClick} />
    </>
  )
}

export default Games