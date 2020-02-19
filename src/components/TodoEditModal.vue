<template>
    <div>
        <b-modal id="editModal" title="Edit todo" ok-title="Save" @ok="saveTodo()" @cancel="clearForm()" :ok-disabled="saveIsDisabled" ok-variant="info">
            <b-form-input v-model="editedTodo.title" placeholder="Todo title" class="mb-3"></b-form-input>
            <b-form-textarea  v-model="editedTodo.description" placeholder="Todo desription..." rows="4" max-rows="6"></b-form-textarea>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'TodoEditModal',
  data(){
      return {
        editedTodo: this.$store.getters.getEditedTodo,
      }
    },
  computed:{
    saveIsDisabled(){
        return this.editedTodo.title && this.editedTodo.description ? false : true
    }
  },
  methods: {
      saveTodo(){
          this.$store.dispatch('updateTodo', this.editedTodo.id)
          this.todoTitle = '';
          this.todoDescription = '';
      },
      clearForm(){
          this.newTodo = '';
          this.todoText = '';
      }
  }
};
</script>