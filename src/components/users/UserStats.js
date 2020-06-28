import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../GridItem'
import StatsGridItem from '../StatsGridItem'
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

  const totalWins = statsService.winsByPlayer(matches, playerId)
  const winPercentage = statsService.playerWinPercentage(matches, totalWins)
  const performance = statsService.playerPerformance(matches, playerId)

  return (
    <>
      <Grid container spacing={2} justify='center' style={{ marginBottom: '0.35em' }}>
        <GridItem title='Matches' value={matches.length} />
        <GridItem title='Wins' value={totalWins} />
        <GridItem title='Win %' value={winPercentage && `${winPercentage} %`} />
        {performance && <StatsGridItem title='Performance'>
            <Chart data={performance} height={150}>
              <ValueAxis />
              <LineSeries valueField='points' argumentField='match' />
            </Chart>
          </StatsGridItem>}
      </Grid>
    </>
  )
}

export default UserStats