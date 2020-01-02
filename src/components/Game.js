import React from 'react'
import Stats from './Stats'

const Game = ({game}) => {
  
  return (
    <>
      {`this is a game called: ${game}`}
      <Stats/>
    </>
  )
}

export default Game