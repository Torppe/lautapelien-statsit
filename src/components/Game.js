import React, { useState } from 'react'
import Stats from './Stats'
import MatchForm from './MatchForm'

const Game = ({game, setHeader}) => {
  const [isModifying, setIsModifying] = useState(true)

  setHeader(game)
  return (
    <>
      {isModifying && <MatchForm />}
      <Stats/>
    </>
  )
}

export default Game