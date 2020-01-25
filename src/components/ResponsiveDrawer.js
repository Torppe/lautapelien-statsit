import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { List } from '@material-ui/core';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemLink from './ListItemLink'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import gameService from '../services/games'
import loginService from '../services/login'
import Games from './Games'
import Game from './Game'
import Login from './Login';
import Users from './users/Users'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ResponsiveDrawer = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [header, setHeader] = useState('')
  const [games, setGames] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTabletopAppUser')
    
    if(loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if(loggedUser) {
        setUser(loggedUser)
        loginService.setToken(loggedUser.token)
      }
    }
    
    const fetchGames = async () => {
      const results = await gameService.getAll()
      setGames(results)
    }

    try {
      fetchGames()
    } catch(error) {
      console.log('failed to fetch game data')
    }
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handlePageTransition = () => {
    if(mobileOpen)
      setMobileOpen(false)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
      </div>
      <Divider />
      <List>
          <ListItemLink key='Home' to='/' primary='Home' handlePageTransition={() => handlePageTransition()}/>
          <ListItemLink key='Games' to='/game-stats' primary='Games' handlePageTransition={() => handlePageTransition()}/>
          <ListItemLink key='Players' to='/player-stats' primary='Players' handlePageTransition={() => handlePageTransition()}/>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{boxShadow: 'none'}} color='primary' position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography color='textPrimary' variant="h6" noWrap>
            {header}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </div>
      <div className={classes.content}>
        <div className={classes.toolbar} />
          <Route exact path="/" render={() => 
            <Login setUser={setUser} user={user} setHeader={setHeader}/>}
          />
          <Route exact path="/game-stats" render={() => 
            <Games games={games} setGames={setGames} user={user} setHeader={setHeader}/>}
          />
          <Route exact path="/player-stats" render={() => 
            <Users setHeader={setHeader}/>}
          />
          <Route exact path="/game-stats/:game" render={({ match }) => 
            <Game gameId={match.params.game} setHeader={setHeader} user={user}/>}
          />
      </div>
    </div>
  )
}

export default ResponsiveDrawer
