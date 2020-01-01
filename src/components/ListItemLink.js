import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default ListItemLink;