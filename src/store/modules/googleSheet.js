import { googleSpreadSheetApi } from '../../api'

export const namespaced = true

export class TodoItem {
  name = ''
  todo = ''

  constructor (name, todo) {
    this.name = name
    this.todo = todo
  }
}

export const state = {
  todos: []
}

export const getters = {}

export const mutations = {
  SET_TODO (state, todos) {
    state.todos = []
    todos.forEach((todo, index) => {
      if (index === 0) return
      state.todos.push(new TodoItem(todo[0], todo[1]))
    })
    console.log(state.todos)
  }
}

export const actions = {
  getTodos ({ commit }, {sheetId, sheetName, apiKey}) {
    googleSpreadSheetApi.fetchTodos(sheetId, sheetName, apiKey)
      .then(response => {
        commit('SET_TODO', response.data.values)
      })
  }
}
