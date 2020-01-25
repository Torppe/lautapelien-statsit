import React, { useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  OutlinedInput,
  FormControl
} from '@material-ui/core'
import { Link } from 'react-router-dom'
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
  input: {
    backgroundColor: 'white',
  }
})

const AddGame = ({ value, handleGameChange, handleAddGame, setIsModifying }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles()

  const handleConfirm = (event) => {
    event.preventDefault()
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleBlur = () => {
    if (!dialogOpen)
      setIsModifying(false)
  }

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Add a new game called "{value}"?</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleAddGame}
            color='primary'
            variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleConfirm}>
        <FormControl variant='outlined'>
          <OutlinedInput
            id='new-game'
            placeholder='Add game'
            variant='outlined'
            color='secondary'
            className={classes.input}
            autoFocus
            value={value}
            onBlur={handleBlur}
            onChange={handleGameChange}
          />
        </FormControl>
      </form>
    </>
  )
}

const Games = ({ games, setGames, user, setHeader }) => {
  setHeader('Games')

  const classes = useStyles()
  const [newGame, setNewGame] = useState(null)
  const [isModifying, setIsModifying] = useState(false)

  const handleAddGame = async () => {

    const newObject = {
      title: newGame
    }

    try {
      const result = await gameService.create(newObject)
      setGames([...games, result])
      setIsModifying(false)
      setNewGame('')
    } catch (error) {
      console.log('failed to create game', error)
    }
  }

  const handleClick = () => {
    setIsModifying(!isModifying)
    setNewGame('')
  }

  const handleGameChange = (event) => {
    setNewGame(event.target.value)
  }

  const userContent = () => {
    if (!user)
      return null

    return (
      <>
        {isModifying &&
          <AddGame
            value={newGame}
            handleGameChange={handleGameChange}
            handleAddGame={handleAddGame}
            setIsModifying={setIsModifying}
          />}
        {!isModifying && <AddButton handleClick={handleClick} />}
      </>
    )
  }

  const gamesContent = () => (
    <Grid container spacing={2} justify='center'>
      {games.map(g =>
        <Grid
          key={g.id}
          item
          className={classes.item}>
          <Link to={`/game-stats/${g.id}`}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography align='left' style={{ fontSize: '1.2em' }}>
                  {g.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      )}
    </Grid>
  )

  return (
    <>
      {!isModifying && gamesContent()}
      {userContent()}
    </>
  )
}

export default Games