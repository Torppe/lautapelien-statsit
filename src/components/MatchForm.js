import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Grid,
  Paper, 
  Container, 
  IconButton, 
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core'
import Player from './Player'
import playerService from '../services/players'
import uuid from 'react-uuid'
import { Cancel } from '@material-ui/icons'

const useStyles = makeStyles({
  cancelButton: {
    float: 'right',
    marginTop: '-30px',
    marginRight: '-30px',
    marginBottom: '15px'
  }
})

const MatchForm = ({ handleSubmit, handleCloseForm }) => {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles()

  let buttonStyle = {
    marginTop: selectedPlayers.length > 0 ? '2em' : null
  }


  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const results = await playerService.getAll()
        setPlayers(results)
      } catch (error) {
        console.log('failed to fetch player data', error)
      }
    }

    fetchPlayers()
  }, [])

  const addMatch = () => {
    const validPlayers = selectedPlayers.filter(p => p.name)
    if (validPlayers.length < 1)
      return

    const submittedPlayers = validPlayers.map(vp => {
      const foundPlayer = players.find(p => p.name === vp.name)
      if (!foundPlayer)
        return null

      return {
        player: foundPlayer.id,
        points: vp.points
      }
    })

    handleSubmit(submittedPlayers)
  }

  const updatePlayer = (newPlayer) => {
    const newPlayers = selectedPlayers.map(p => p.id !== newPlayer.id ? p : newPlayer)
    setSelectedPlayers(newPlayers)
  }

  const addPlayer = () => {
    const newPlayer = {
      id: uuid(),
      name: '',
      points: null
    }
    setSelectedPlayers([...selectedPlayers, newPlayer])
  }

  const removePlayer = (player) => {
    const newSelectedPlayers = selectedPlayers.filter(p => p.id !== player.id)
    setSelectedPlayers(newSelectedPlayers)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleConfirm = (event) => {
    event.preventDefault()

    setDialogOpen(true)
  }

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Add a new match?</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={addMatch}
            color='primary'
            variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleConfirm}>
        <Container maxWidth='sm' disableGutters>
          <Paper style={{ padding: '2em' }}>
            <IconButton
              onClick={handleCloseForm}
              aira-label='cancel'
              className={classes.cancelButton}>
              <Cancel />
            </IconButton>
            {selectedPlayers.map(p =>
              <Player
                key={p.id}
                player={p}
                players={players}
                selectedPlayers={selectedPlayers}
                removePlayer={removePlayer}
                updatePlayer={updatePlayer} />
            )}
            <Container disableGutters>
              <Grid container justify='space-between' style={buttonStyle}>
                <Grid item>
                  <Button variant='outlined' color='primary' onClick={addPlayer}>Add player</Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>Submit</Button>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Container>
      </form>
    </div>
  )
}

export default MatchForm