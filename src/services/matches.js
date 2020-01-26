import axios from 'axios'
import loginService from '../services/login'
const baseUrl = '/api/matches'

const getAll = async () => {
  const results = await axios.get(baseUrl)
  return results.data
}

const getByGame = async (id) => {
  const results = await axios.get(`${baseUrl}/game/${id}`)
  return results.data
}

const getByPlayer = async (id) => {
  const results = await axios.get(`${baseUrl}/player/${id}`)
  return results.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: loginService.getToken()}
  }

  const result = await axios.post(baseUrl, newObject, config)
  return result.data
}

export default {
  getAll,
  create,
  getByGame,
  getByPlayer
}
