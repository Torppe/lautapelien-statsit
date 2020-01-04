import React, { useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, makeStyles, Grid, Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const Player = ({removePlayer, thisPlayer}) => {
  const [player, setPlayer] = useState()
  const [points, setPoints] = useState(null)

  return (
    <Grid container spacing={2} alignItems='center' justify='center'>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="player-label">Player</InputLabel>
          <Select labelId='player-label' id='player' value={player} onChange={({ target }) => setPlayer(target.value)}>
            <MenuItem value='Tuomas'>Tuomas</MenuItem>
            <MenuItem value='Maiju'>Maiju</MenuItem>
            <MenuItem value='Iida'>Iida</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <TextField id='points' label='Points' type='number' defaultValue={points} onChange={({ target }) => setPoints(target.value)} />
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <IconButton aira-label='delete' onClick={() => removePlayer(thisPlayer)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const MatchForm = () => {
  const [players, setPlayers] = useState(['m','t','j'])

  const addMatch = (event) => {
    event.preventDefault()
    console.log(`submitted ${players}`)
  }

  const addPlayer = () => {
    setPlayers([...players, 'new player'])
  }

  const removePlayer = (removedPlayer) => {
    setPlayers(players.filter(p => p !== removedPlayer))
  }

  return (
    <div>
      <form onSubmit={addMatch}>
        {players.map(p => 
          <Player key={p} thisPlayer={p} removePlayer={removePlayer} />
        )}
      </form>
      <Button onClick={addPlayer}>Add player</Button>
    </div>
  )
}

export default MatchForm