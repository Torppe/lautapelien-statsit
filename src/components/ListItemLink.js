import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ListItemLink = ({ icon, primary, to, handlePageTransition }) => {
  return (
    <li>
      <ListItem button component={Link} to={to} onClick={handlePageTransition}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default ListItemLink;