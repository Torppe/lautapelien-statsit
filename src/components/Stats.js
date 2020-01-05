import React, { useState } from 'react'
import { Bar, Pie, StackedBar, Line } from 'react-roughviz'
import Grid from '@material-ui/core/Grid'
import { Typography, Card, CardContent } from '@material-ui/core'

const Stats = ({ data }) => {
  const matches = data.map(d => d.players).flat()
  const points = matches.map(m => m.points)
  const averagePoints = points.reduce((acc, item) => acc + item, 0) / points.length

  // käytetään jos tarvitaan taulukkoa
  // const playersWithPoints = players.reduce((newArray, item) => {
  //   if (newArray.some(p => p.player === item.player)) {
  //     return newArray.map(p => {
  //       if(p.player === item.player) {
  //         const newObject = {
  //           ...p,
  //           points: p.points + item.points
  //         }
  //         return newObject
  //       } else {
  //         return p
  //       }
  //     })
  //   } else {
  //     return [...newArray, item]
  //   }
  // }, [])

  const playersWithPoints = matches.reduce((newArray, item) => {
    return {
      ...newArray,
      [item.player]: newArray[item.player] === undefined ? item.points : newArray[item.player] + item.points
    }
  }, {})

  return (
    <>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average points
              </Typography>
              <Typography variant="h5" component="h2">
                {averagePoints}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average points
              </Typography>
              <Typography variant="h5" component="h2">
                {averagePoints}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Stats