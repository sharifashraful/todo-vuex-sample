<template>
    <v-container>
        <Title :title="title"/>
        <RegLoginForm :isRegPage=isRegPage />
    </v-container>
</template>

<script>
import RegLoginForm from '../components/RegLoginForm'
import Title from '../components/Title'
export default {
    name: 'Register',
    data() {
        return {
            title: 'REGISTER',
            isRegPage: true
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