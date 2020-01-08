import React, { useState, useEffect } from 'react'
import { List, TextField } from '@material-ui/core'
import ListItemLink from './ListItemLink'
import AddButton from './AddButton'
import gameService from '../services/games'

const AddGame = ({value, handleGameChange, addGame}) => {
  return(
    <form onSubmit={addGame}>
      <TextField id='new-game' label='Add game' variant='outlined' autoFocus value={value} onChange={handleGameChange}/>
    </form>     
  )
}

const Games = ({setHeader}) => {
  setHeader('Games')

  const [games, setGames] = useState([])
  const [newGame, setNewGame] = useState('')
  const [isModifying, setIsModifying] = useState(false)

  useEffect(() => {
    gameService
      .getAll()
      .then(response => {
        setGames(response.data)
      })
  }, [])


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
  }

  const handleClick = () => {
    setIsModifying(!isModifying)
    setNewGame('')
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
      {isModifying && <AddGame value={newGame} handleGameChange={handleGameChange} addGame={addGame}/>}
      <AddButton handleClick={handleClick}/>
    </>
  )
}

export default Games