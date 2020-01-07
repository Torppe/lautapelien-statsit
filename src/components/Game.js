import React, { useState } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'
import { Button } from '@material-ui/core'
import AddButton from './AddButton'
const data = [
  {
    id: 1,
    players: [
      {
        _id: 1,
        player: 'Tuomas',
        points: 5
      },
      {
        _id: 2,
        player: 'Maiju',
        points: 4
      }
    ]
  },
  {
    id: 2,
    players: [
      {
        _id: 1,
        player: 'Tuomas',
        points: 1
      },
      {
        _id: 2,
        player: 'Maiju',
        points: 3
      }
    ]
  }
]

const Game = ({ game, setHeader }) => {
  const [isModified, setIsModified] = useState(false)
  const [matches, setMatches] = useState(data)

  const handleSubmit = (players) => {
    const newMatch = {
      id: 3,
      players: players
    }
    const newMatches = [...matches, newMatch]
    console.log(newMatches)
    setMatches(newMatches)
    setIsModified(false)
  }

  setHeader(game)

  return (
    <>
      <AddButton handleClick={() => setIsModified(!isModified)}/>
      {isModified ? <MatchForm handleSubmit={handleSubmit}/> : <Stats data={matches}/>}
    </>
  )
}

export default Game