import axios from 'axios'
import { config } from './apiConfig'

const googleSheetApi = axios.create({
  baseURL: config.baseUrl
})

export function fetchTodos (sheetId, sheetName, apiKey) {
  console.log(apiKey)
  const params = { key: apiKey }
  return googleSheetApi.get(`${sheetId}/values/${sheetName}`, { params })
}
