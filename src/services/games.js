import axios from 'axios'
import loginService from './login'

const baseUrl = '/api/games'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const getById = async (id) => {
  const result = await axios.get(`${baseUrl}/${id}`)
  return result.data
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
  getById
}
