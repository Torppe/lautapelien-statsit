import React, { useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

// const Player = ({ id, removePlayer, setPlayers, players }) => {
const Player = ({ player, removePlayer, updatePlayer }) => {
  // const [player, setPlayer] = useState({
  //   _id: id,
  //   player: '',
  //   points: null
  // })

  // const changePlayer = (value, valueToChange) => {
  //   let newPlayer = { ...player }

  //   valueToChange === 'name' ? newPlayer.player = value : newPlayer.points = Number(value)

  //   setPlayer(newPlayer)
  //   setPlayers(players.map(p => p._id !== id ? p : newPlayer))
  // }

  return (
    <Grid container spacing={2} alignItems='center' justify='center'>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id='player-label'>Player</InputLabel>
          <Select labelId='player-label' id='player' value={player.player} onChange={({ target }) => updatePlayer(player, target.value, 'name')}>
            <MenuItem value='Tuomas'>Tuomas</MenuItem>
            <MenuItem value='Maiju'>Maiju</MenuItem>
            <MenuItem value='Iida'>Iida</MenuItem>
            <MenuItem value='Joona'>Joona</MenuItem>
            <MenuItem value='Jokke'>Jokke</MenuItem>
            <MenuItem value='Jyri'>Jyri</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <TextField id='points' label='Points' type='number' defaultValue={player.points} onChange={({ target }) => updatePlayer(player, target.value, 'points')} />
        </FormControl>
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