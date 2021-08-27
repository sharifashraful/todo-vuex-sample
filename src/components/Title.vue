<template>
   <div>
       <h1 class="Header">{{title}}</h1>
   </div> 
</template>

<script>
export default {
   name: "Title",
   props: {
       title : String 
   }
}
</script>

<style scoped>
    .Header {
        font-weight: 300;
        font-size: 4rem;
        letter-spacing: -0.09375rem;
        text-align: center;
    }
</style>