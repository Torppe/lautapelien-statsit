import React, { useState } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'
import { Button } from '@material-ui/core'
const data = [
  {
    id: 1,
    players: [
      {
        player: 'Tuomas',
        points: 5
      },
      {
        player: 'Maiju',
        points: 4
      }
    ]
  },
  {
    id: 2,
    players: [
      {
        player: 'Tuomas',
        points: 1
      },
      {
        player: 'Maiju',
        points: 3
      }
    ]
  }
]

const Game = ({ game, setHeader }) => {
  const [isModified, setIsModified] = useState(false)
  const [matches, setMatches] = useState(data)

  setHeader(game)

  return (
    <>
      <Button onClick={() => setIsModified(!isModified)}>Add new match</Button>
      {isModified ? <MatchForm /> : <Stats data={matches}/>}
    </>
  )
}

export default Game