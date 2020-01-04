import React, { useState } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'
import { Button } from '@material-ui/core'

const Game = ({game, setHeader}) => {
  const [isModified, setIsModified] = useState(false)

  setHeader(game)
  
  return (
    <>
      <Button onClick={() => setIsModified(!isModified)}>Add new match</Button>
      {isModified ? <MatchForm /> : <Stats/>}
    </>
  )
}

export default Game