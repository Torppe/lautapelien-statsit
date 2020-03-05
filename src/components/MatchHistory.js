import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const MatchHistory = ({ matches }) => {
  const matchesByDate = matches.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const formatDate = (input) => {
    if(!input)
      return null

    var date = new Date(input)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  return (
    <>
      {matchesByDate.map(m => {
        return(
          <ExpansionPanel key={m.id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>{formatDate(m.date)} </Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        ) 
      })}
    </>
  )
}

export default MatchHistory