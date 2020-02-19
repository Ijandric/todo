<template>
  <div class="todo-list">
    <div v-if="todos.length > 0">

      <!-- Search -->
      <b-input-group class="mt-3 pl-0 pr-0 search-field col-12" >
        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search" ></b-form-input>

        <b-input-group-append>
          <b-button class="bg-info" :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
      <!-- End search -->

      <!-- Delete button -->
      <div class="" :class="{'d-none': !rowsSelected, 'd-flex': rowsSelected}">
        <TodoDeleteModal :mode="deleteMode" />
      </div>
      <!-- End delete button -->
    
    </div>

    <!-- Table -->
    <b-table class="mt-3" 
      responsive 
      bordered 
      hover
      striped
      selectable
      :items="todos" 
      :fields="tableFields" 
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
      select-mode="multi"
      @row-selected="onRowSelected"
      :busy="isBusy"
      v-if="todos.length > 0"
    >
      <template v-slot:table-busy>
        <div class="text-center text-info my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>

      <template v-slot:cell(#)="data">
        <div class="select-row" :class="{'active': data.rowSelected}"></div>
      </template>

      <template v-slot:cell(id)="data">
        <span class="font-weight-light" :title="data.item.id">{{ data.item.id }}.</span>
      </template>

      <template v-slot:cell(title)="data">
        <span class="font-weight-bold title-col">
          <router-link class="text-info" :to="{ name: 'todo', params: { id: data.item.id }}">
            {{ data.item.title }}
          </router-link>
        </span> 
      </template>

      <template v-slot:cell(description)="data">
        <span class="font-weight-light">{{ data.item.description }}</span> 
      </template>

      <template v-slot:cell(created)="data">
        <span>{{dateTemplate(data.item.created)}} <span class="font-weight-light">  {{timeTemplate(data.item.created)}}</span></span> 
      </template>

      <template v-slot:cell(edit)="data">
        <b-button v-b-modal.editModal variant="outline-info" size="sm" @click="setEditTodo(data.item)">edit</b-button>
      </template>
    </b-table>
    <!-- End table -->

    <!-- Pagination -->
    <b-pagination v-if="paginationVisible" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"></b-pagination>  
    <!-- End pagination -->
    
    <!-- Edit modal -->
    <TodoEditModal />
    <!--End edit modal -->
  </div>
</template>

<script>
  import TodoDeleteModal from '@/components/TodoDeleteModal';
  import TodoEditModal from '@/components/TodoEditModal';

  export default {
    name: 'TodoList',
    components: {
      TodoDeleteModal,
      TodoEditModal
    },
    data(){
      return {
        tableFields: [
          { key: '#', tdClass: 'selection-col' },
          { key: 'id', sortable: true, tdClass: 'id-col' },
          { key: 'title', sortable: true,tdClass: 'title-col' },
          { key: 'description', sortable: true },
          { key: 'created', sortable: true, tdClass: 'created-col' },
          { key: 'edit', tdClass: 'actions-col' }
        ],
        filter: null,
        filterOn: [],
        currentPage: 1,
        perPage: 5,
        selected: this.$store.getters.getSelectedTodos,
        deleteMode: 'multi',
        filterRows: 0,
      }
    },
    beforeDestroy(){
      this.$store.commit('clearSelected');
    },
    computed:{
      isBusy(){
        return this.$store.getters.tableIsBusy
      }, 
      paginationVisible(){
        if(this.totalRows > 5){

          if(this.filter && this.filterRows < 5){
            return false;
          }
          return true;
        }
      },
      todos(){
        return this.$store.state.todos
      },
      rowsSelected(){
        return this.selected.length > 0 ? true : false;
      },
      totalRows(){
        return this.$store.getters.getAllTodos.length;
      }
    },
    methods:{
      dateTemplate(t){
        const date = new Date(t.seconds*1000);
         return date.toLocaleDateString();
      },
      timeTemplate(t){
        const date = new Date(t.seconds*1000);
         return date.toLocaleTimeString();
      },
      onRowSelected(item) {
        this.$store.commit('selectTodo', item);
      },
      onFiltered(filteredItems) {
        this.filterRows = filteredItems.length
        this.currentPage = 1  
      },
      setEditTodo(item){
        this.$store.commit('setEditedTodo', item);
      }
    }
  }
</script>

<style lang="scss">
.todo-list {
  .search-field {
    transition: all 0.2s ease-in-out;
  }
  .table th, .table td {
    vertical-align: middle;
  }
  .title-col {
    min-width: 130px;
  }
  .actions-col {
    width: 65px;
  }
  .selection-col {
    width: 45px;
  }
  .id-col {
    max-width: 55px;

    span {
      display: block;
      max-width: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .created-col {
    width: 200px;
  }
  .page-item {
    .page-link {
      color: #17a2b8; 
    }
    
    &.active .page-link {
      background-color: #17a2b8;  
      border-color: #17a2b8;  
      color: #fff; 
    }
  }
  .pagination {
    padding-left: 0;
  }
  .select-row {
    width: 20px;
    height: 20px;
    border: 1px solid #17a2b8;
    border-radius: 50%;

    &.active {
      background: #17a2b8
    }
  }
}
</style>
