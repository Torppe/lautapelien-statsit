import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../GridItem'
import statsService from '../../services/stats'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const UserStats = ({ matches, playerId }) => {
  if(!matches || matches.length < 1)
    return null

  const data = [{argument: 1, value: 10}]
  const totalWins = statsService.winsByPlayer(matches, playerId)
  const winPercentage = statsService.playerWinPercentage(matches, totalWins)
  const performance = statsService.playerPerformance(matches, playerId)

  return (
    <>
      <Grid container spacing={2} justify='center' style={{ marginBottom: '0.35em' }}>
        <GridItem title='Matches' value={matches.length} />
        <GridItem title='Wins' value={totalWins} />
        <GridItem title='Win %' value={winPercentage && `${winPercentage} %`} />
        {performance && <GridItem title='Performance' value='0' itemWidth='30em'>
            <Chart data={performance}>
              <ArgumentAxis/>
              <ValueAxis />
              <LineSeries valueField='points' argumentField='match' />
            </Chart>
          </GridItem>}
      </Grid>
    </>
  )
}

export default UserStats