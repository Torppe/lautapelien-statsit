import React, { useEffect, useState } from 'react'
import matchService from '../../services/matches'

const User = ({ playerId }) => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const fetchMatches = async () => {
      const results = await matchService.getByPlayer(playerId)
      setMatches(results)
    }

    try {
      fetchMatches()
    } catch (error) {
      console.log('failed to fetch match data', error)
    }

  }, [playerId])

  return(
    <>
      {matches.length}
    </>
  )
}

export default User