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

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
  getAll,
  create,
  update,
  getByGame
}
