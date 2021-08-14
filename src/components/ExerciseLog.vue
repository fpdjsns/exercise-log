<template>
  <div>
<!--    <button @click = "addTodo()">추가해라</button>-->

    <div>sheetId : <input v-model="sheetId" placeholder="sheetId"></div>
    <div>sheetName : <input v-model="sheetName" placeholder="sheetName"></div>
    <div>apiKey :  <input v-model="apiKey" placeholder="apiKey"></div>
    <button @click= "get()">정보 가져오기</button>

    <table class="table">
      <thead>
      <tr>
        <th>
        </th>
        <th>name</th>
        <th>todo</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="item in this.todos()" v-bind:key="item.key">
        <td>
          <input type="checkbox" :value="item.key">
        </td>
        <td>{{item.name}}</td>
        <td>{{item.todo}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ExerciseLog',
  data () {
    return {
      msg: 'Exercise Log',
      sheetId: '',
      sheetName: '',
      apiKey: ''
    }
  },
  created () {
  },
  methods: {
    get () {
      this.getTodos({sheetId: this.sheetId, sheetName: this.sheetName, apiKey: this.apiKey})
    },
    addTodo () {
      this.name = ''
      this.todo = ''
    },
    ...mapState({
      todos: state => state.googleSheet.todos
    }),
    ...mapActions({
      getTodos: 'googleSheet/getTodos'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
