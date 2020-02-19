<template>
  <v-app>
    <b-navbar type="dark" variant="info">
      <div class="container bg-info">
        <b-navbar-brand class="brand"><router-link to="/" class="font-weight-light">OVER<span class="font-weight-bold">9000</span>TODOS</router-link></b-navbar-brand>
      </div>
    </b-navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$store.dispatch('retriveTodos');
  },
};
</script>

<style lang="scss">
  *:focus {
    outline:none
  } 
  #app {
    background: #ececec;
  }
  .container {
    background: #FFF;
    height: 100%;
  }
  .text-white {
    color: #FFF !important;
  }
  nav {
     color: #FFF;

    .brand {
      color: inherit;
      
      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }
</style>
