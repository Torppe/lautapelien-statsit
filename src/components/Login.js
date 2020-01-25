import React, { useState } from 'react'
import { FormControl, OutlinedInput, Button, Grid, makeStyles } from '@material-ui/core'
import loginService from '../services/login'

const storageKey = 'loggedTabletopAppUser'

const useStyles = makeStyles(theme => ({
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
          {user === null ? loginForm() : logoutForm()}
        </Grid>
      </form>
    </div>
  )
}

export default Login