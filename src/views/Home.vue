<template>
    <v-container>
        <Title :title="title"/>
        <RegLoginForm :isLoginPage=isLoginPage />
    </v-container>
</template>

<script>
import RegLoginForm from '../components/RegLoginForm'
import Title from '../components/Title'
export default {
    name: 'Home',
    data() {
        return {
            title: 'LOGIN ',
            isLoginPage: true
        }
    },
    components: {
        RegLoginForm,
        Title
    },

}
</script>

<style>

</style>