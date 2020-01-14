import React, { useState, useEffect } from 'react'
import { Button, Grid, Paper, Container } from '@material-ui/core'
import Player from './Player'
import playerService from '../services/players'
import uuid from 'react-uuid'

const MatchForm = ({ handleSubmit }) => {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])

  let buttonStyle = {
    marginTop: selectedPlayers.length > 0 ? '2em' : null
  }

  useEffect(() => {
    playerService
      .getAll()
      .then(response => {
        setPlayers(response.data)
      })
      .catch(error => {
        console.log("failed to fetch player data", error)
      })
  }, [])

  const addMatch = (event) => {
    event.preventDefault()
    const validPlayers = selectedPlayers.filter(p => p.name)
    if(validPlayers.length < 1)
      return
    
    const submittedPlayers = validPlayers.map(vp => {
      const foundPlayer = players.find(p => p.name === vp.name)
      if(!foundPlayer)
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
  
  return (
    <div>
      <form onSubmit={addMatch}>
        <Container maxWidth='sm' disableGutters>
          <Paper style={{padding: '2em'}}>
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