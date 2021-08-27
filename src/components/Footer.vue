<template>
   <v-card
       class="mx-auto"
       max-width="700"
       tile>

      <v-footer
          padless>
          <v-row>
              <v-col
              cols="3"
              class="text-center">

                <v-btn 
                text 
                normal 
                color="primary" 
                @click="completeTasks">

                    <caption >Complete : {{showCompleteTodo}}</caption>

                </v-btn>
              </v-col>

              <v-col 
              cols="6">
              </v-col>

              <v-col 
              cols="3"
              class="text-center">

                <v-btn text normal disabled >

                    <caption>Item : {{showTodos.length}}</caption>

                </v-btn>

              </v-col>
          </v-row>
      </v-footer>  
      <v-footer
      padless
      dark>

        <v-col
          class="text-center footerStyle "
          cols="12">

          <v-card-text
          class="footerStyle">
            {{ new Date().getFullYear() }} — By <strong>SasongkoAdi</strong>
          </v-card-text>

        </v-col>
      </v-footer>
   </v-card>            
</template>

<script>
import { mapGetters }  from 'vuex'
export default {
    name: "Footer",
    data() {
        return {
            todos: [],
        }
    },
    methods: {
        completeTasks(){
            this.todos = this.showTodos
            this.$store.dispatch('tasks/completeAllTasks',this.todos)
        }, 
    },
    computed: {
        ...mapGetters({
            showTodos :'tasks/showTodos',
            showCompleteTodo: 'tasks/showCompleteTodo'})
    },
}
</script>

<style scoped>
    .buttonComplete {
        padding: flex;
    }
    .itemTodo {
        padding: flex;
    }
    .footerStyle {
        padding-top: 4px !important;
        padding-bottom: 4px !important;
    }
</style>
