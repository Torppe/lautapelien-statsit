import React, { useState } from 'react'
import { List, TextField } from '@material-ui/core'
import ListItemLink from './ListItemLink'
import AddButton from './AddButton'

const data = [
  {
    _id: "1",
    title: "7 wonders",
  },
  {
    _id: "2",
    title: "Terraforming mars",
  },
  {
    _id: "3",
    title: "Power grid",
  },
]

const GameForm = ({value, handleGameChange, addGame}) => {
  return(
    <form onSubmit={addGame}>
      <TextField id='new-game' label='Add game' variant='outlined' value={value} onChange={handleGameChange}/>
    </form>     
  )
}

const Games = () => {
  const [games, setGames] = useState(data)
  const [newGame, setNewGame] = useState('')
  const [isModifying, setIsModifying] = useState(false)

  const addGame = (event) => {
    event.preventDefault()
    const newId = Math.max(...games.map(g => g._id)) + 1
    const gameObject = {
      _id: newId.toString(),
      title: newGame
    }
    setGames([...games, gameObject])
    setIsModifying(false)
    setNewGame('')
    console.log(`new game added! ${gameObject._id}`)
  }

  const handleClick = () => {
    setIsModifying(!isModifying)
  }

  const handleGameChange = (event) => {
    setNewGame(event.target.value)
  }

  return (
    <>
      <List>
        {games.map(g => 
          <ListItemLink key={g._id} primary={g.title} to={`/game-stats/${g.title}`}/>
        )}
      </List>
      {isModifying ? <GameForm value={newGame} handleGameChange={handleGameChange} addGame={addGame}/> : null}
      <AddButton handleClick={handleClick}/>
    </>
  )
}

export default Games