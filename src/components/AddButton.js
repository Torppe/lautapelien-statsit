import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    borderRadius: '0.5em',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const AddButton = props => {
  const classes = useStyles();
  return (
    <>
      <Fab onClick={props.handleClick} className={classes.root} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  )
}

export default AddButton