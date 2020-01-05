import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import Player from './Player'

const MatchForm = ({handleSubmit}) => {
  const [players, setPlayers] = useState([])

  const addMatch = (event) => {
    event.preventDefault()
    handleSubmit(players)
    console.log('submitted', players)
  }

  const updatePlayer = (player, value, valueToChange) => {
    let newPlayer = { ...player }
    valueToChange === 'name' ? newPlayer.player = value : newPlayer.points = Number(value)
    setPlayers(players.map(p => p._id !== player._id ? p : newPlayer))
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
        {players.map(p => 
          <Player key={p._id} player={p} removePlayer={removePlayer} updatePlayer={updatePlayer}/>
        )}
      <Button onClick={addPlayer}>Add player</Button>
      <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default MatchForm