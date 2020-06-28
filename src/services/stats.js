const averagePoints = (points) => {
  return +(points.reduce((acc, item) => acc + item, 0) / points.length).toFixed(2)
}

const playerWithMostWins = (matches) => {
  if(!matches)
    return
  
  let playerMap = new Map()
  const winnerArray = matches.map(m => m.winner)
  
  winnerArray.forEach(w => {
    const wins = playerMap.get(w.player.name)
    if(wins) {
      playerMap.set(w.player.name, wins + 1)
    } else {
      playerMap.set(w.player.name, 1)
    }
  })

  const result = [...playerMap.entries()].reduce((prev, current) => current[1] > prev[1] ? current : prev, [0,0])
  return {name: result[0], wins: result[1]}
}

const playerWithMostPoints = (players) => {
  return players.length > 0 ? players.reduce((acc, item) => (item.points > acc.points) ? item : acc) : null
}

const playerPerformance = (matches, playerId) => {
  if(!matches || matches.length < 2)
    return null

  const matchesByPlayer = matches.map(m => m.players).flat().filter(p => p.player.id === playerId)
  const data = matchesByPlayer.map((m, index) => {
    return {
      match: index + 1,
      points: m.points
    } 
  })

  return data
}

const winsByPlayer = (matches, playerId) => {
  const playersArray = matches.map(m => m.players)
  let wins = 0
  let winner

  for (let i = 0; i < playersArray.length; i++) {
    winner = playersArray[i].reduce((prev, current) => (current.points > prev.points) ? current : prev)
    if (winner.player.id === playerId) {
      wins++
    }
  }
  return wins
}

const playerWinPercentage = (matches, totalWins) => {
  return +(totalWins / matches.length * 100).toFixed(1)
}

export default {
  averagePoints,
  playerWithMostPoints,
  playerWithMostWins,
  playerPerformance,
  winsByPlayer,
  playerWinPercentage
}