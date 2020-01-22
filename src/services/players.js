import axios from 'axios'
const baseUrl = '/api/players'

const getAll = async () => {
  const results = await axios.get(baseUrl)
  return results.data
}

const getById = async (id) => {
  const result = await axios.get(`${baseUrl}/${id}`)
  return result.data
}

export default {
  getAll,
  getById
}
