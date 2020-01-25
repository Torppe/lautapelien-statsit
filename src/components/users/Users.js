import React, { useEffect, useState } from 'react'
import playerService from '../../services/players'



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
    } catch(error) {
      console.log('failed to fetch player data')
    }
  },[])

  return(
    <ul>
      {players.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  )
}

export default Users