import React, { useState } from 'react'
import { FormControl, Input, Button } from '@material-ui/core'
import loginService from '../services/login'

const storageKey = 'loggedTabletopAppUser'

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
      <FormControl>
        <Input
          id='username'
          value={username}
          color='secondary'
          placeholder='username'
          onChange={({ target }) => setUsername(target.value)} />
      </FormControl>
      <FormControl>
        <Input
          id='password'
          value={password}
          type='password'
          color='secondary'
          placeholder='password'
          onChange={({ target }) => setPassword(target.value)} />
      </FormControl>
      <Button variant='contained' color='secondary' type='submit'>login</Button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <Button variant='contained' color='secondary' type='submit'>logout</Button>
    </form>
  )

  return (
    <div>
      {user === null ? loginForm() : logoutForm()}
    </div>
  )
}

export default Login