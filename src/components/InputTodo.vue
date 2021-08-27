<template>
    <v-card        
        class="mx-auto"
        max-width="700"
        max-height="600"
        tile >
       <v-text-field 
       class="TextInput"
       ref="disableInput"
       label="What's Your Focus for Today ?"
       @keyup.enter="addTodoList"
       clearable/>
    </v-card>
</template>

<script>
export default {
    name: "InputTodo",
    data(){
        return {
            item: {},
        }
    },
    methods: {
        addTodoList(event){
            if (!event.target.value.trim()) return;
            this.item = event.target.value
            this.$store.dispatch('tasks/addTask', this.item)
            this.$refs.disableInput.reset()
        }
    },
}
</script>

<style scoped>
    v-text-field {
        max-width: 50%;
        width: 25%;
        border: 2px solid,
    }
    div {
        text-align: center;
        margin: 20px;
    }
    .TextInput {
        font-size: 1.8rem;
        letter-spacing: normal;
    }
</style>