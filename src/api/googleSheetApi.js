import axios from 'axios'
import { config } from './apiConfig'

const googleSheetApi = axios.create({
  baseURL: config.baseUrl
})

export function getItems (sheetId, sheetName, apiKey) {
  const params = { key: apiKey }
  return googleSheetApi.get(`${sheetId}/values/${sheetName}`, { params })
}
export function postItem (sheetId, sheetName, apiKey, item) {
  const range = `${sheetName}!A1:D1`
  const params = { key: apiKey, valueInputOption: 'USER_ENTERED' }
  const body = {
    range: range,
    majorDimension: 'ROWS',
    values: [item.date, item.isCardio, item.isWeightTraining, item.weight, item.list]
  }
  return googleSheetApi.post(`${sheetId}/values/${range}:append`, body, { params })
}
