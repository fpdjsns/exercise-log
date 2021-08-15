<template>
  <div>
<!--    <button @click = "addTodo()">추가해라</button>-->

    <div class="apiInfo">
      <div>sheetId : <input v-model="sheetId" placeholder="sheetId"></div>
      <div>sheetName : <input v-model="sheetName" placeholder="sheetName"></div>
      <div>apiKey :  <input v-model="apiKey" placeholder="apiKey"></div>
      <button @click= "get()">정보 가져오기</button>
    </div>
    <p></p>

    <table class="table" :style="style.table">
      <thead :style="style.thread">
      <tr>
        <th>일자</th>
        <th>유산소</th>
        <th>무산소</th>
        <th>몸무게</th>
        <th>운동목록</th>
      </tr>
      </thead>
      <tbody :style="style.tbody">

      <tr v-for="item in this.items()" v-bind:key="item.key">
        <template v-if="item.summary">
          <td>{{item.date}}</td>
          <td></td>
          <td></td>
          <td>{{item.weight}}</td>
          <td>{{item.list}}</td>
        </template>
        <template v-else>
          <td>{{item.date}}</td>
          <td>
            <input type="checkbox" v-model="item.isCardio">
          </td>
          <td>
            <input type="checkbox" v-model="item.isWeightTraining">
          </td>
          <td>{{item.weight}}</td>
          <td>{{item.list}}</td>
        </template>
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
      apiKey: '',

      style: {
        table: {
          borderCollapse: 'collapse',
          padding: '10px',
          border: '2px solid #ddd',
          borderTop: '3px solid #fb7399'
        },

        thread: {
          color: '#fb7399',
          background: '#f7e6ec',
          textAlign: 'center'
        },

        tbody: {
          color: '#0094D7'
        }
      }
    }
  },
  created () {
  },
  methods: {
    get () {
      this.getItems({sheetId: this.sheetId, sheetName: this.sheetName, apiKey: this.apiKey})
    },
    ...mapState({
      items: state => state.googleSheet.items
    }),
    ...mapActions({
      getItems: 'googleSheet/getItems'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th {
  padding: 10px
}
</style>
