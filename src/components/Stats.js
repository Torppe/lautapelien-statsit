import React, { useState } from 'react'
import { Bar, Pie, StackedBar } from 'react-roughviz'
import Grid from '@material-ui/core/Grid'
import { Button, Typography } from '@material-ui/core'

const Stats = () => {
  const players = ['Tuomas', 'Jyri', 'Joona', 'Iida', 'Jokke', 'Maiju']
  const [wins, setWins] = useState([0,1,2,3,4,5])

  const modifyWin = (player, amount) => {
    const playerOrder = players.findIndex(p => p === player)
    let newWins = [...wins]
    const newAmount = newWins[playerOrder] + (1 * amount)

    if(newAmount < 0)
      newWins[playerOrder] = 0
    else
      newWins[playerOrder] = newAmount
      
    setWins(newWins)
  }

  
  return (
    <>
      <Grid container justify='space-around' spacing={2}>
        <Grid item>
          <Grid container justify='center' spacing={2}>
          <Bar 
            data={{
              labels: players,
              values: wins
            }}
            title="wins"
            />
          <div style={{marginTop:'1em', listStyleType: 'none'}}>
            {players.map(p => 
              <li>
                <Typography>{p}</Typography>
                <Button variant='contained' color='primary' onClick={() => modifyWin(p, 1)}>+</Button>
                <Button variant='outlined' color='primary' onClick={() => modifyWin(p, -1)}>-</Button>  
              </li>
            )}
          </div>
          </Grid>
        </Grid>
        {/* <Grid item>
          <Pie
            data={{
              labels: ['North', 'South', 'East', 'West'],
              values: [10, 5, 8, 3],
            }}
            title="Regions"
            colors={['red', 'orange', 'blue', 'skyblue']}
            roughness={0}
            strokeWidth={3}
          />
        </Grid> */}
      </Grid>
      {/* <Bar
        data="https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv"
        labels="flavor"
        values="price"
      /> */}
      {/* <h3>Pie</h3> */}
      {/* <Pie
        data={{
          labels: ['North', 'South', 'East', 'West'],
          values: [10, 5, 8, 3],
        }}
        title="Regions"
        colors={['red', 'orange', 'blue', 'skyblue']}
        roughness={8}
        strokeWidth={3}
      /> */}
      {/* <StackedBar
        data={[
          {month: 'Jan', A: 20, B: 5, C: 10},
          {month: 'Feb', A: 25, B: 10, C: 20},
          {month: 'March', A: 30, B: 50, C: 10},
        ]}
        labels="month"
        title="Monthly Revenue"
      /> */}
    </>
  )
}

export default Stats