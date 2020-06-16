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

export default {
  averagePoints,
  playerWithMostPoints,
  playerWithMostWins
}