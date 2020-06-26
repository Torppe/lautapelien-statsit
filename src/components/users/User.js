import React, { useEffect, useState } from 'react'
import { Typography, FormControl, InputLabel, Select, MenuItem, Container, makeStyles } from '@material-ui/core'
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

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '470px'
  },
  bottomMargin: {
    marginBottom: '1em'
  },
  gameStats: {
    marginBottom: '0.35em',
    marginTop: '1em'
  }

}))

const User = ({ playerId, setHeader }) => {
  const [matches, setMatches] = useState([])
  const [playedGames, setPlayedGames] = useState([])
  const [selectedGame, setSelectedGame] = useState("")

  const classes = useStyles()

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

  const handleChange = ({ target }) => {
    setSelectedGame(target.value)
  }

  return (
    <>
      <Container disableGutters className={classes.container}>
        <Typography component='h2' variant='h4' align='center' className={classes.bottomMargin}>
          Overall stats
        </Typography>
        <UserStats matches={matches} playerId={playerId}/>
        <Typography component='h2' variant='h4' align='center' className={classes.gameStats}>
          Game stats
        </Typography>
        <FormControl variant="outlined" fullWidth className={classes.bottomMargin}>
          <InputLabel id="game-label">
            Game
          </InputLabel>
          <Select
            labelId="game-label"
            id="game-select-menu"
            value={selectedGame}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {playedGames.map(g =>
              <MenuItem key={g.id} value={g.id}>{g.title}</MenuItem>
            )}
          </Select>
        </FormControl>
        {selectedGame && <UserStatsByGame matches={matches} playerId={playerId} gameId={selectedGame} />}
      </Container>
    </>
  )
}

export default User