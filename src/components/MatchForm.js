import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import Player from './Player'

const MatchForm = () => {
  const [players, setPlayers] = useState([])

  const addMatch = (event) => {
    event.preventDefault()
    console.log(`submitted ${players}`)
  }

  const addPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p._id)) + 1 : 0
    const newPlayer = {
      _id: newId.toString(),
      player: ""
    }
    setPlayers([...players, newPlayer])
  }

  const removePlayer = (id) => {
    setPlayers(players.filter(p => p._id !== id))
  }

  return (
    <div>
      <form onSubmit={addMatch}>
        {players.map(p => 
          <Player key={p._id} id={p._id} removePlayer={removePlayer} />
        )}
      <Button onClick={addPlayer}>Add player</Button>
      <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default MatchForm