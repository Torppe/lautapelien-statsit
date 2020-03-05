import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  makeStyles,
  Container
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ReactComponent as Crown } from '../images/crown_icon.svg'

const useStyles = makeStyles({
  header: {
    fontWeight: 700,
    paddingTop: 0
  },
  paddingSides: {
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  details: {
    padding: 0
  },
  historyHeader: {
    padding: '1em 0'
  }
})

const MatchHistory = ({ matches }) => {
  const classes = useStyles()


  const recentMatches = () => {
    const matchesByDate = matches.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    return matchesByDate.slice(0, 5)
  }

  const formatDate = (input) => {
    if (!input)
      return null

    var date = new Date(input)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  const resultList = (players) => {
    return (
      <TableContainer>
        <Table aria-label="match results">
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.header} ${classes.paddingSides}`}>Player</TableCell>
              <TableCell className={`${classes.header} ${classes.paddingSides}`} align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(player => (
              <TableRow key={player.player.id}>
                <TableCell className={classes.paddingSides} component="th" scope="row">
                  {player.player.name}
                </TableCell>
                <TableCell className={classes.paddingSides} align="right">{player.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <>
      <Typography component='h2' variant='h4' align='center' className={classes.historyHeader}>
        Recent Matches
      </Typography>
      <Container disableGutters style={{ maxWidth: '620px' }} align='center'>
        {matches.length < 1 && <em>no matches</em>}
        {recentMatches().map(m => {
          return (
            <ExpansionPanel key={m.id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}>
                <Typography>{formatDate(m.date)}</Typography>
                <Crown style={{ width: '3em', height: '1.5em' }} />
                <Typography>{m.winner.player.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {resultList(m.players)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </Container>
    </>
  )
}

export default MatchHistory