<template>
    <v-list-item-content>
        <v-list-item-content class="listGroup">
            <v-row v-if="input === true">
                <v-col>
                    <v-text-field 
                    class="text-list"
                    label="What's Your New Idea" 
                    @mouseout="cancelEdit" 
                    ref="disableEdit" 
                    @keyup.enter="editTask"></v-text-field>
                </v-col> 
            </v-row>
            <v-row v-else>
                <v-col
                cols="9"
                class="text-left">
                    <v-list-item-title  v-if="todo.complete === false"  class="text-list" @click="itsDone">{{todo.description}}</v-list-item-title>
                    <v-list-item-title  v-else class="text-list complete" @click="itsDone">{{todo.description}}</v-list-item-title>
                </v-col>
                <v-col 
                cols="3"
                class="text-right">
                    <v-btn normal text color="green" @click="isEdit">Edit</v-btn>
                    <v-btn normal text color="error" @click="removeTodo" >
                        <i class="far fa-trash-alt" ></i>
                    </v-btn> 
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item-content>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: "TodoListItems",
    data(){
        return {
            input: false
        }
    },
    props: {
        todo: Object,
        index: Number
    },
    methods: {
        ...mapMutations({
            deleteTodo : 'tasks/deleteTodo',
            completeTodo : "tasks/completeTodo",
            changeTodo : "tasks/changeTodo", 
            }),
        removeTodo(){
            this.$store.dispatch('tasks/deleteTask', {index: this.index, id: this.todo._id})
        },
        itsDone(){
            console.log('Boolean :',!this.todo.complete);
            this.$store.dispatch('tasks/editTask', { id: this.todo._id, index: this.index, description: this.todo.description, status: !this.todo.complete} )
        },
        isEdit(){
            this.input = true
        },
        cancelEdit(){
            this.input = false
        },
        editTask(){
            this.$store.dispatch('tasks/editTask', { id: this.todo._id, index: this.index, description: event.target.value, status: this.todo.complete} )
        }
    },
}
</script>

<style scoped>
    .listGroup{
        cursor : pointer; 
        padding-top: 0px; 
        padding-bottom: 0px;
    }
    .text-list{
        font-size: 1.8rem;
        letter-spacing: normal;
        word-break: break-word;
        white-space: normal;
    }
    .complete {
        color: #a5a5a5;
        text-decoration: line-through;
        text-decoration-style: double;
    }
</style>