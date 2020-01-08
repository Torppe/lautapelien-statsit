import React from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const Player = ({ availablePlayers, player, players, removePlayer, updatePlayer }) => {
  const unavailablePlayers = players.map(p => p.player)

  const updateSelection = (value) => {
    const newPlayer = {
      ...player,
      player: value
    }

    updatePlayer(newPlayer)
  }

  const updatePoints = (value) => {
    const newPlayer = {
      ...player,
      points: Number(value)
    }

    updatePlayer(newPlayer)
  }

  return (
    <Grid container spacing={1} justify='center'>
      <Grid item md={3} xs={5}>
        <FormControl 
          fullWidth 
          variant='outlined'
          required
        >
          <InputLabel id='player-label'>Player</InputLabel>
          <Select
            labelId='player-label'
            id='player'
            value={player.player}
            onChange={({ target }) => updateSelection(target.value)}
          >
            {availablePlayers.map(p => <MenuItem key={p} disabled={unavailablePlayers.includes(p)} value={p}>{p}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={3} xs={5}>
        <TextField
          fullWidth
          required
          id='points'
          label='Points'
          type='number'
          defaultValue={player.points}
          onChange={({ target }) => updatePoints(target.value, 'points')}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton aira-label='delete' onClick={() => removePlayer(player)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Player