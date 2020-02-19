<template>
    <div>
        <!-- Add button -->
        <b-button v-b-modal.createModal variant="info">+ Add todo</b-button>
        <!-- End add button -->

        <!-- Add modal -->
        <b-modal id="createModal" title="Add todo item" ok-title="Add" @ok="saveTodo()" @cancel="clearForm()" :ok-disabled="saveIsDisabled" ok-variant="info">
            <b-form-input v-model="todoTitle" placeholder="Todo title" class="mb-3"></b-form-input>
            <b-form-textarea v-model="todoDescription" placeholder="Todo desription..." rows="4" max-rows="6"></b-form-textarea>
        </b-modal>
        <!-- End add modal -->
    </div>
</template>

<script>
export default {
  name: 'TodoCreateModal',
  data: () => ({
    todoTitle: '',
    todoDescription: ''
  }),
  computed:{
    saveIsDisabled(){
        return this.todoTitle && this.todoDescription ? false : true
    }
  },
  methods: {
    saveTodo(){
        let date = new Date();

        let todo = {
        title: this.todoTitle,
        description: this.todoDescription,
        created: date
        }
        
        this.$store.dispatch("addTodo", todo)
        clearForm();
    },
    clearForm(){
        this.todoTitle = '';
        this.todoDescription = '';
    }
  }
};
</script>