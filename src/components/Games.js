import React, { useState } from 'react'
import { List, ListItemText , ListItem } from '@material-ui/core'
import ListItemLink from './ListItemLink'
import AddButton from './AddButton'

const Games = () => {
  const [games, setGames] = useState(['Terraforming mars', '7 wonders'])
  const gamesList = games.map(g => 
    <ListItemLink key={g} primary={g} to='/game-stats'/>
    // <ListItem key={g}>
    //   <ListItemText>{g}</ListItemText>
    // </ListItem>
  )

  const handleClick = () => {
    if(games.map(g => g.toLowerCase()).includes('new game'))
      return;
    setGames([...games, 'new game'])
    
    console.log("clicked")
  }

  return (
    <>
      <List>
        {gamesList}
      </List>
      <AddButton handleClick={handleClick}/>
    </>
  )
}

export default Games