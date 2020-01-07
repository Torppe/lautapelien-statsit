import React, { useState } from 'react'
import { Button, Grid, Paper, Container } from '@material-ui/core'
import Player from './Player'

const availablePlayers = ['Tuomas', 'Maiju', 'Iida', 'Jyri', 'Jokke', 'Joona']

const MatchForm = ({ handleSubmit }) => {
  const [players, setPlayers] = useState([])

  const addMatch = (event) => {
    event.preventDefault()
    const validPlayers = players.filter(p => p.player)
    handleSubmit(validPlayers)
    console.log('submitted', validPlayers)
  }

  const updatePlayer = (newPlayer) => {
    const newPlayers = players.map(p => p._id !== newPlayer._id ? p : newPlayer)
    setPlayers(newPlayers)
  }

  const addPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p._id)) + 1 : 0
    const newPlayer = {
      _id: newId,
      player: '',
      points: null
    }
    setPlayers([...players, newPlayer])
  }

  const removePlayer = (player) => {
    setPlayers(players.filter(p => p._id !== player._id))
  }

  return (
    <div>
      <form onSubmit={addMatch}>
        <Container maxWidth='md' disableGutters>
          <Paper style={{padding: '2em'}}>
            {players.map(p =>
              <Player key={p._id} availablePlayers={availablePlayers} player={p} players={players} removePlayer={removePlayer} updatePlayer={updatePlayer} />
              )}
            <Grid container justify='space-between'>
              <Grid item>
                <Button variant='outlined' color='primary' onClick={addPlayer}>Add player</Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='primary' type='submit'>Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </form>
    </div>
  )
}

export default MatchForm