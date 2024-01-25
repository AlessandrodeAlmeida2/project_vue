import { createStore } from 'vuex'
import axios from 'axios';

// endereço do banco de dados
// const dbUrl = 'https://api.jsonbin.io/v3/b/65b133ed266cfc3fde7f642f'

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },

    storeTodo(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      if (index >= 0) {
        state.todos.splice(index, 1, payload)
      } else {
        state.todos.push(payload)
      }
    },

    deleteTodo(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)

      if (index >= 0) {
        state.todos.splice(index, 1)
      }
    },
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return axios.get('http://localhost:3000/todos') // para usar o json da nuvem: `{ dbUrl }` e substituir linha 39 por: commit('storeTodos', response.data.record.todos)
              .then((response) => {
                commit('storeTodos', response.data)
                resolve()
              })
        }, 1000)
      })
    },

    addTodo({ commit }, data) {
      return axios.post('http://localhost:3000/todos', data).then((response) => {
        commit('storeTodo', response.data);
      })
    },

    updateTodo({ commit }, { id, data }) {
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        commit('storeTodo', response.data)
      })
    },

    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    }
  },

  getters: {
  },
  modules: {
  }
})
