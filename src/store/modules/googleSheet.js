import { googleSpreadSheetApi } from '../../api'

export const namespaced = true

function isEmpty (str) {
  return typeof str === 'undefined' || str == null || str === ''
}

export class LogItem {
  date = ''
  isCardio = false // 유산소 운동 여부
  isWeightTraining = false // 무산소 운동 여부
  weight = ''
  list = ''
  summary = false

  OK = 'O'
  NO = 'X'

  constructor (item) {
    this.date = item[0]
    this.isCardio = this.convertToBoolean(item[1])
    this.isWeightTraining = this.convertToBoolean(item[2])
    this.weight = item[3]
    this.list = item[4]
    this.summary = this.convertToSummary(item[0])
  }

  convertToSummary (date) {
    return isNaN(Date.parse(date))
  }

  convertToBoolean (str) {
    return !isEmpty(str) && str.toUpperCase() === this.OK
  }

  convertToString (flag) {
    return flag === true ? this.OK : this.NO
  }
}

export const state = {
  items: []
}

export const getters = {}

export const mutations = {
  SET_ITEM (state, items) {
    state.items = []
    items.forEach((item, index) => {
      if (index < 3) return
      console.log(item)
      state.items.push(new LogItem(item))
    })
  }
}

export const actions = {
  getItems ({ commit }, {sheetId, sheetName, apiKey}) {
    googleSpreadSheetApi.fetchTodos(sheetId, sheetName, apiKey)
      .then(response => {
        commit('SET_ITEM', response.data.values)
      })
  }
}
