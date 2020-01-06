import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
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
        {players.map(p =>
          <Player key={p._id} availablePlayers={availablePlayers} player={p} players={players} removePlayer={removePlayer} updatePlayer={updatePlayer} />
        )}
        <Button onClick={addPlayer}>Add player</Button>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default MatchForm