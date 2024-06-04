import axios from "axios"
import { API_URL } from "../config"

const baseUri = API_URL + '/movies'

export const retrieveAllMovies = async () => {
  try {
    const {data} = await axios.get(baseUri)
    return data
  } catch (e) {
    console.error(e)
    return false
  }
}

export const retrieveSingleMovie = async id => {
  const uri = `${baseUri}/${id}`
  try {
    const {data} = await axios.get(uri)
    return data
  } catch (e) {
    console.error(e)
    return false
  }
}

export const createMovie = async movie => {
  try {
    const {data} = await axios.post(baseUri, movie)
    return data
  } catch (e) {
    console.error(e)
    return false
  }
}

export const updateMovie = async movie => {
  const uri = `${baseUri}/${movie.id}`
  try {
    await axios.put(uri, movie)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const deleteMovie = async id => {
  const uri = `${baseUri}/${id}`
  try {
    await axios.delete(uri)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}