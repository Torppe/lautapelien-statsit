import React from 'react'
import Stats from './Stats'

const Game = ({game, setHeader}) => {
  setHeader(game)
  return (
    <>
      <Stats/>
    </>
  )
}

export default Game