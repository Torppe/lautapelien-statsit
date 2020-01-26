import React, { useEffect, useState } from 'react'
import playerService from '../../services/players'
import { List } from '@material-ui/core'
import ListItemLink from '../ListItemLink'


const Users = ({ setHeader }) => {
  setHeader('Players')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const results = await playerService.getAll()
      setPlayers(results)
    }
    try {
      fetchPlayers()
    } catch (error) {
      console.log('failed to fetch player data')
    }
  }, [])

  return (
    <>
      <List disablePadding>
        {players.map(p => <ListItemLink key={p.id} to={`/player-stats/${p.id}`} primary={p.name} />)}
      </List>
    </>
  )
}

export default Users