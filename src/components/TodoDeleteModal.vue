<template>
    <div>
        <!-- Delete button -->
        <b-button v-b-modal.deleteModal variant="danger">Delete</b-button>
        <!-- End delete button -->

        <!-- Delete modal -->
        <b-modal id="deleteModal" title="Delete selection" ok-title="Delete" @ok="deleteSelected()" ok-variant="danger">
            Are you sure you want to delete selected items? 
        </b-modal>
        <!-- End delete modal -->
    </div>
</template>

<script>
export default {
  name: 'TodoDeleteModal',
  props: ['mode', 'todoId'],
  methods: {
      deleteSelected(){
        this.$store.dispatch('deleteTodo', {mode: this.mode, todoId: this.todoId})
        if(this.mode === 'single'){
          this.$router.push('/')
        }
      },
  }
};
</script>