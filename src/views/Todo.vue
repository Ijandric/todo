<template>
  <div class="about container">
    <!-- Back button -->
   <div class="mb-5">
      <router-link class="text-info mt-2 d-block font-weight-light" to="/" ><i class="material-icons">arrow_back</i> Home</router-link>
   </div>
   <!-- End back button -->

   <!-- Title  -->
   <h1 class="text-info">{{todo.title.toUpperCase()}}</h1>
   <!-- End title  -->

   <!-- Created date -->
   <div>
     <span class="font-weight-regular">{{dateTemplate(todo.created)}} </span>
     <span class="font-weight-light">{{timeTemplate(todo.created)}} </span>
   </div>
   <!-- End created date -->

   <hr/>

   <!-- Id -->
   <div>
     <span class="font-weight-bold mb-5">ID: </span>
     <span class="font-weight-light">{{todo.id}}</span>
   </div>
   <!-- End id -->

   <hr/>

   <!-- Description -->
   <div>
     <div class="font-weight-bold mb-5">Description: </div>
     <span class="font-weight-light">{{todo.description}}</span>
   </div>
   <!-- End description -->

   <hr/>
   
   <!-- Actions -->
   <div class="d-flex">
      <b-button class="mr-3" v-b-modal.editModal variant="info" size="sm" @click="setEditTodo(todo)">edit</b-button>
      <TodoEditModal />
      <TodoDeleteModal :mode="deleteMode" :todoId="todo.id" />
   </div>
   <!-- End actions -->
  </div>
</template>

<script>
import TodoEditModal from '@/components/TodoEditModal';
import TodoDeleteModal from '@/components/TodoDeleteModal';

export default {
  name: 'App',
  components: {
    TodoEditModal,
    TodoDeleteModal
  },
  data(){
    return {
      deleteMode: "single"
    }
  },
  computed:{
    todo(){
      return this.$store.getters.getTodo(this.$route.params.id);
    },
  },
  methods:{
    setEditTodo(item){
      this.$store.commit('setEditedTodo', this.todo);
    },
    dateTemplate(t){
      const date = new Date(t.seconds*1000);
      return date.toLocaleDateString();
    },
    timeTemplate(t){
      const date = new Date(t.seconds*1000);
      return date.toLocaleTimeString();
    },
  }
};
</script>

<style scoped>
  .material-icons {
    font-size: 12px;
  }
</style>
