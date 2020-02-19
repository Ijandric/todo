<template>
  <div class="container home">
    <TodoCreateModal class="mt-2" />
    <TodoList />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import TodoCreateModal from '@/components/TodoCreateModal'

export default {
  name: 'home',
  components: {
    TodoList,
    TodoCreateModal
  }
}
</script>
