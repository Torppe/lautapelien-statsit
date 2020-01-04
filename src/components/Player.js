import React, { useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const Player = ({removePlayer, id}) => {
  const [player, setPlayer] = useState('')
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
        <IconButton aira-label='delete' onClick={() => removePlayer(id)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Player