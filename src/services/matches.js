import axios from 'axios'
const baseUrl = '/api/matches'

const getAll = () => {
  return axios.get(baseUrl)
}

const getByGame = (id) => {
  return axios.get(`${baseUrl}/game/${id}`)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

export default {
  getAll,
  create,
  getByGame
}
