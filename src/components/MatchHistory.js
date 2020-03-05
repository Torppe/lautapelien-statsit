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
  makeStyles
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
  }
})

const MatchHistory = ({ matches }) => {
  const classes = useStyles()

  const matchesByDate = matches.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

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
      {matchesByDate.map(m => {
        return (
          <ExpansionPanel key={m.id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}>
              <Typography>{formatDate(m.date)}</Typography>
              <Crown style={{width: '3em', height: '1.5em'}}/>
              <Typography>{m.winner.player.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              {resultList(m.players)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </>
  )
}

export default MatchHistory