import React, { useState } from 'react'
import { FormControl, OutlinedInput, Button, Grid, makeStyles } from '@material-ui/core'
import loginService from '../services/login'

const storageKey = 'loggedTabletopAppUser'

const useStyles = makeStyles({
  item: {
    width: '11.5em'
  }
})

const Login = ({ setUser, user }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    <form onSubmit={handleLogin}>
      <Grid
        container
        spacing={2}
        justify='center'
        alignItems='center'
        direction='column'>
        <Grid item>
          <FormControl variant='outlined'>
            <OutlinedInput
              id='username'
              value={username}
              color='secondary'
              placeholder='username'
              style={{ backgroundColor: 'white', borderRadius: '40px' }}
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
              style={{ backgroundColor: 'white', borderRadius: '40px' }}
              inputProps={{ style: { textAlign: 'center' } }}
              onChange={({ target }) => setPassword(target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            style={{ borderRadius: '40px', padding: '15px 30px', marginTop: '1em' }}>
            login
          </Button>
        </Grid>
      </Grid>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <Button
        variant='contained'
        color='secondary'
        type='submit'
        style={{ borderRadius: '40px', padding: '15px 30px', marginTop: '1em' }}>
        logout
      </Button>
    </form>
  )

  return (
    <div>
      {user === null ? loginForm() : logoutForm()}
    </div>
  )
}

export default Login