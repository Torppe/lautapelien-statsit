import React, { useEffect, useState } from 'react'
import { Typography, List, Button } from '@material-ui/core' 
import matchService from '../../services/matches'
import playerService from '../../services/players'
import UserStats from './UserStats'
import UserStatsByGame from './UserStatsByGame'

const games = (matches) => {
  const results = [];
  const set = new Set();
  
  for (const item of matches) {
    if (!set.has(item.game.id)) {
      set.add(item.game.id);
      results.push({
        id: item.game.id,
        title: item.game.title
      });
    }
  }

  return results
}

const User = ({ playerId, setHeader }) => {
  const [matches, setMatches] = useState([])
  const [playedGames, setPlayedGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      const results = await matchService.getByPlayer(playerId)
      setMatches(results)
      setPlayedGames(games(results))
    }

    const fetchPlayer = async () => {
      const player = await playerService.getById(playerId)
      setHeader(player.name)
    }

    try {
      fetchMatches()
      fetchPlayer()
    } catch (error) {
      console.log('failed to fetch match or player data', error)
    }

  }, [playerId, setHeader])

  return(
    <>
      <Typography component='h2' variant='h5' gutterBottom>
        Overall stats
      </Typography>
      <UserStats matches={matches} playerId={playerId}/>
      <Typography component='h2' variant='h5' gutterBottom>
        Game specific stats
      </Typography>
      <List disablePadding>
        {playedGames.map(g => <Button key={g.id} onClick={() => setSelectedGame(g.id)}>{g.title}</Button>)}
      </List>
      {selectedGame && <UserStatsByGame matches={matches} playerId={playerId} gameId={selectedGame}/>}
    </>
  )
}

export default User