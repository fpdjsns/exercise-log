import { googleSpreadSheetApi } from '../../api'

export const namespaced = true

function isEmpty (str) {
  return typeof str === 'undefined' || str == null || str === ''
}

const dateOptions = {weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit'}

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
    if (!arguments.length) {
      this.date = this.convertDateToString(new Date())
    } else {
      this.summary = this.convertToSummary(item[0])
      if (this.summary) {
        this.date = item[0]
      } else {
        this.date = this.convertDateToString(this.convertStringToDate(item[0]))
      }
      this.isCardio = this.convertToBoolean(item[1])
      this.isWeightTraining = this.convertToBoolean(item[2])
      this.weight = item[3]
      this.list = item[4]
    }
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

  convertStringToDate (str) {
    return new Date(str)
  }

  convertDateToString (date) {
    return date.toLocaleDateString('ko-KR', dateOptions)
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
    googleSpreadSheetApi.getItems(sheetId, sheetName, apiKey)
      .then(response => {
        commit('SET_ITEM', response.data.values)
      })
  },
  addItem ({ commit }, {sheetId, sheetName, apiKey, item}) {
    googleSpreadSheetApi.postItem(sheetId, sheetName, apiKey, item)
      .then(response => {
      })
  }
}
