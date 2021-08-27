<template>
    <v-card
       class="mx-auto"
       max-width="700"
       tile >
       <template v-for="(todo,index) in showTodos" >
        <v-list-item :key="todo.description">
            <TodoListItems :todo="todo" :index="index"></TodoListItems> 
        </v-list-item>
       </template>
    </v-card>
</template>

<script>
import { mapGetters }  from 'vuex'
import TodoListItems  from './TodoListItems'
export default {
   name: "TodoList",
   components: {
       TodoListItems
   },
   methods: {
       
   },
   computed: {
       ...mapGetters({
           showTodos: 'tasks/showTodos'
        }),
   },
}

</script>