import React, { useState } from 'react'
import { FormControl, OutlinedInput, Button, Grid, makeStyles, Typography, useTheme } from '@material-ui/core'
import loginService from '../services/login'
import { ReactComponent as Logo } from '../images/tabletop_icon.svg'

const storageKey = 'loggedTabletopAppUser'

const useStyles = makeStyles(theme => ({
  heading: {
    marginTop: '65px',
    marginBottom: '65px'
  },
  button: {
    width: '150px',
    borderRadius: '40px',
    padding: '15px 30px',
    marginTop: '1em'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: '40px',
    textAlign: 'center',
  },
  logo: {
    width: '8em',
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: '50px',
      right: 0
    },
  }
}))

const Login = ({ setUser, user, setHeader }) => {
  setHeader('Login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles()
  const theme = useTheme();

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        storageKey, JSON.stringify(newUser)
      )

      loginService.setToken(newUser.token)
      setUser(newUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('failed to login', error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(storageKey)
    setUser(null)
  }

  const loginForm = () => (
    <>
      <Grid item>
        <FormControl variant='outlined'>
          <OutlinedInput
            id='username'
            value={username}
            color='secondary'
            placeholder='username'
            className={classes.input}
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={({ target }) => setUsername(target.value)} />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl variant='outlined'>
          <OutlinedInput
            id='password'
            value={password}
            type='password'
            placeholder='password'
            color='secondary'
            className={classes.input}
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={({ target }) => setPassword(target.value)} />
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          className={classes.button}>
          login
          </Button>
      </Grid>
    </>
  )

  const logoutForm = () => (
    <Button
      variant='contained'
      color='secondary'
      type='submit'
      className={classes.button}>
      logout
    </Button>
  )

  return (
    <div>
      <form onSubmit={user === null ? handleLogin : handleLogout}>
        <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          direction='column'
          className={classes.container}>
          <Grid item className={classes.logo}>
            <Logo fill={theme.palette.text.primary}/>
          </Grid>
          <Grid item className={classes.heading}>
            <Typography component='h2' variant='h4' color='textPrimary' gutterBottom>
              Keep track of
            </Typography>
            <Typography component='h2' variant='h4' color='textPrimary'>
              Tabletop stats
            </Typography>
          </Grid>
          {user === null ? loginForm() : logoutForm()}
        </Grid>
      </form>
    </div>
  )
}

export default Login