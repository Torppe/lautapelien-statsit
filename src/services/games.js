import axios from 'axios'
const baseUrl = '/api/games'

const getAll = () => {
  return axios.get(baseUrl)
}

const getById = (id) => {
  return axios.get(`${baseUrl}/${id}`)
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
  getById
}
