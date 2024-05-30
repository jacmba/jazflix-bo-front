import axios from "axios"
import { API_URL } from "../config"

const baseUri = API_URL + '/section'

export const retrieveAllSections = async () => {
  try {
    const {data} = await axios.get(baseUri)
    return data
  } catch (e) {
    console.error(e)
    return false
  }
}

export const retrieveSingleSection = async id => {
  try {
    const {data} = await axios.get(`${baseUri}/${id}`)
    return data
  } catch (e) {
    console.error(e)
    return false
  }
}

export const createSection = async section => {
  try {
    const {data} = await axios.post(baseUri, section)
    return data
  } catch (e) {
    console.error(e)
    return false
  }
}

export const updateSection = async section => {
  try {
    const uri = `${baseUri}/${section.id}`
    await axios.put(uri, section)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const deleteSection = async id => {
  try {
    const uri = `${baseUri}/${id}`
    await axios.delete(uri)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}