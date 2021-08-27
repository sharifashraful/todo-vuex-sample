<template>
  <v-app>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
        <v-btn icon>
          <i class="fa fa-sign-in fa-2x" aria-hidden="true" @click="handleLogout"></i>
        </v-btn>
    </v-app-bar>

    <v-main>
      
      <v-container>
        <router-view></router-view>
       <!-- <Title />
       <InputTodo /> 
       <TodoList />

       <div v-if="showTodos.length >= 1">
        <Footer />
       </div>

       <div v-else>
       </div> -->

      </v-container>

    </v-main>

  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapMutations({
      clearTasks: 'tasks/clearTasks'
    }),
    async handleLogout(){
      await this.$store.dispatch('auth/logout' )
      await this.clearTasks()
      return this.$router.push({ name: 'Home'}).catch(() => {})
    }
  },
};
</script>
