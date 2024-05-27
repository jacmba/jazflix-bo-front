import axios from "axios"
import { API_URL } from "../config"

const BASE_URL = API_URL + '/user'

export const retrieveUsers = async () => {
  const {data} = await axios.get(BASE_URL)

  return data
}