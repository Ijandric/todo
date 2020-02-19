import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    selectedTodos:[],
    editedTodo: {
      id: null,
      title: '',
      description: '',
      created: null
    },
    tableIsBusy: false
  },
  getters: {
    getAllTodos: state =>  state.todos,
    getTodo: (state) => (id) => state.todos.find(todo => todo.id === id),
    getSelectedTodos: state => state.selectedTodos,
    getEditedTodo: state => state.editedTodo,
    tableIsBusy: state => state.tableIsBusy,
  },
  mutations: {
    retriveTodos: (state, items) => {
      items.forEach(item => {
        state.todos.push(item)
      })
    },
    addTodo(state, todo){
      state.todos.push(todo)
    },
    updateTodo: (state, todoId) => {
        const selected = state.todos.find(x => x.id === todoId);

        Vue.set(selected, 'title', state.editedTodo.title);
        Vue.set(selected, 'description', state.editedTodo.description);

        state.editedTodo.title = '';
        state.editedTodo.description = '';
    },
    deleteTodo: (state, id) => {
      state.todos = state.todos.filter(todo => todo.id !== id);
      state.selectedTodos.splice(0, state.selectedTodos.length);
    },
    deleteSelectedTodos: (state) => {
      state.selectedTodos.forEach((item) => {
        const index = state.todos.indexOf(item)
        state.todos.splice(index, 1)
      })
      state.selectedTodos.splice(0, state.selectedTodos.length);
    },
    selectTodo: (state, items) => {
      state.selectedTodos.length = 0
      items.length > 0
        ? items.forEach((i) => {state.selectedTodos.push(i)})
        : state.selectedTodos.splice(0, state.selectedTodos.length);
    },
    clearSelected: (state) => {
        state.selectedTodos.splice(0, state.selectedTodos.length);
    },
    setEditedTodo: (state, item) => {
      Vue.set(state.editedTodo, 'id', item.id)
      Vue.set(state.editedTodo, 'title', item.title)
      Vue.set(state.editedTodo, 'description', item.description)
      Vue.set(state.editedTodo, 'created', item.created)
    },
    toggleBusy(state, busy) {
      Vue.set(state, 'tableIsBusy', busy);
    }
  },
  actions: {
    retriveTodos({commit}){
      commit('toggleBusy', true)
      db.collection('todos').get()
      .then(querySnapshot => {
        let tempTodos = [];
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            created: doc.data().created
          }
          tempTodos.push(data)
        })

        const tempTodosSorted = tempTodos.sort((a,b) => a.created.seconds - b.created.seconds)

        commit('retriveTodos', tempTodosSorted)
        commit('toggleBusy', false)
      })
    },
    addTodo({commit}, todo){
      commit('toggleBusy', true)
      db.collection('todos').add({
          title: todo.title,
          description: todo.description,
          created: db.app.firebase_.firestore.Timestamp.fromDate(todo.created)
      }).then(docRef => {
        commit('addTodo', {
          id: docRef.id,
          title: todo.title,
          description: todo.description,
          created: db.app.firebase_.firestore.Timestamp.fromDate(todo.created)
        })
        commit('toggleBusy', false)
      })
    },
    updateTodo({commit, state}, id){
      commit('toggleBusy', true)
      db.collection('todos').doc(id).set({
        title: state.editedTodo.title,
        description: state.editedTodo.description,
        created: state.editedTodo.created
      }).then(()=>{
        commit('updateTodo', id)
        commit('toggleBusy', false)
      })
    },
    deleteTodo({commit, state}, data){
      commit('toggleBusy', true)
      if(data.mode === 'multi'){
        state.selectedTodos.forEach((item) => {
          db.collection('todos').doc(item.id).delete()
          .then(()=>{
            commit("deleteTodo", item.id)
            commit('toggleBusy', false)
          })
        })
      }
      else{
        db.collection('todos').doc(data.todoId).delete()
          .then(()=>{
            commit("deleteTodo", data.todoId)
            commit('toggleBusy', false)
          })
      }
    }
  }
})
