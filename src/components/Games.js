import React, { useState } from 'react'
import { List, TextField } from '@material-ui/core'
import ListItemLink from './ListItemLink'
import AddButton from './AddButton'
import gameService from '../services/games'

const AddGame = ({value, handleGameChange, handleAddGame}) => {
  return(
    <form onSubmit={handleAddGame}>
      <TextField id='new-game' label='Add game' variant='outlined' autoFocus value={value} onChange={handleGameChange}/>
    </form>     
  )
}

const Games = ({games, setGames}) => {
  const [newGame, setNewGame] = useState(null)
  const [isModifying, setIsModifying] = useState(false)

  const handleAddGame = async (event) => {
    event.preventDefault()

    const newObject = {
      title: newGame
    }

    gameService
      .create(newObject)
      .then(response => {
        setGames([...games, response.data])
        setIsModifying(false)
        setNewGame('')
      })
      .catch(error => {
        console.log('failed to create game')
      })
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
          <ListItemLink key={g.id} primary={g.title} to={`/game-stats/${g.id}`}/>
        )}
      </List>
      {isModifying && <AddGame value={newGame} handleGameChange={handleGameChange} handleAddGame={handleAddGame}/>}
      <AddButton handleClick={handleClick}/>
    </>
  )
}

export default Games