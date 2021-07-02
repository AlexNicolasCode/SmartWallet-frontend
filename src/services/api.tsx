import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://smartwallet-backend.herokuapp.com/api/users'
})

export default api;
