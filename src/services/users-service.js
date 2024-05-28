import axios from "axios"
import { API_URL } from "../config"

const BASE_URL = API_URL + '/user'

export const createUser = async user => {
  const {data} = await axios.post(BASE_URL, user)
  return data
}

export const updateUser = async user => {
  try {
    await axios.put(`${BASE_URL}/${user.id}`, user)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const retrieveUsers = async () => {
  const {data} = await axios.get(BASE_URL)
  return data
}

export const retrieveUser = async user => {
  const {data} = await axios.get(`${BASE_URL}/${user}`)
  return data
}

export const deleteUser = async user => {
  const uri = `${BASE_URL}/${user}`
  try {
    await axios.delete(uri)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}