import React from 'react'
import UserStats from './UserStats'
import statsService from '../../services/stats'
import StatsGridItem from '../StatsGridItem'
import {
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const UserStatsByGame = ({ matches, playerId }) => {
  const performance = statsService.playerPerformance(matches, playerId)

  return (
    <>
      <UserStats matches={matches} playerId={playerId}/>
      {performance && <StatsGridItem title='Performance'>
            <Chart data={performance} height={150}>
              <ValueAxis />
              <LineSeries valueField='points' argumentField='match' />
            </Chart>
          </StatsGridItem>}
    </>
  )
}

export default UserStatsByGame