<template>
    <form name="form" >
        <div v-if="isLoginPage" >

            <v-row justify="center">
                <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    name="user.email"
                    outlined
                    required
                ></v-text-field>
            </v-row> 
            <v-row>
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    v-model="user.password"
                    name="user.password"
                    label="Password"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    @keyup.enter="handleLogin"
                    outlined
                    required
                ></v-text-field>
            </v-row>
            <div v-if="showError">
                <v-alert 
                    v-model="alert"
                    dense
                    outlined
                    type="error"
                    dismissible 
                >Username or Password is incorrect</v-alert>
            </div>
            <v-row justify="space-between">
                <div class="d-flex mb-6"/>
                <div class="d-flex mb-6"/>
                <v-btn 
                class="d-flex mb-4"
                @click="handleLogin" 
                :loading=loading>
                    Submit
                </v-btn>
                
                <v-btn
                class="d-flex mb-4"
                @click="registerPage"
                :loading=loading>
                    Sign Up
                </v-btn>
                <div class="d-flex mb-6"/>
                <div class="d-flex mb-6"/>
            </v-row>

        </div>

        <div v-if="isRegPage">
            <v-row justify="center">
                <v-text-field
                    v-model="user.name"
                    label="Name"
                    name="user.name"
                    @input="$v.user.name.$touch()"
                    :error-messages="nameErrors"
                    outlined
                    required
                ></v-text-field>
            </v-row> 
            <v-row justify="center">
                <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    name="user.email"
                    @input="$v.user.email.$touch()"
                    :error-messages="emailErrors"
                    outlined
                    required
                ></v-text-field>
            </v-row> 
            <v-row>
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    v-model="user.password"
                    name="user.password"
                    label="Password"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                    @keyup.enter="handleRegister"
                    @input="$v.user.password.$touch()"
                    :error-messages="passwordErrors"
                    outlined
                    required
                ></v-text-field>
            </v-row>
            <div v-if="showError">
                <v-alert 
                    v-model="alert"
                    dense
                    outlined
                    type="error"
                    dismissible 
                >Username or Password is incorrect</v-alert>
            </div>
            <v-row justify="space-between">
                <div class="d-flex mb-6"/>
                <div class="d-flex mb-6"/>
                <v-btn 
                class="d-flex mb-4"
                @click="handleRegister" 
                :loading=loading
                :disabled="validInput">
                    Register 
                </v-btn>
                
                <v-btn
                class="d-flex mb-4"
                @click="loginPage">
                    Sign In
                </v-btn>
                <div class="d-flex mb-6"/>
                <div class="d-flex mb-6"/>
            </v-row>
        </div>
        <div>
            <v-alert
                v-if="message" 
                dense
                outlined
                :type="successful ? 'success' : 'error'" 
            >{{message}}</v-alert>
        </div>

    </form>

</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, required, minLength } from 'vuelidate/lib/validators' 
import User from '../models/user'
export default {
    mixins: [validationMixin],
    validations: {
        user: {
            name: {
                required
            },
            password: {
                required,
                minLength: minLength(8),
            },
            email: {
                required,
                email
            }
        }
    },
    name: 'RegLoginForm',
    data() {
        return {
            user: new User('', ''),
            name: '',
            email: '',
            password: '',
            message:'',
            successful: false,
            loading: false,
            disabled: true,
            alert: true,
            showError: false,
            show1: false,
        }
    },
    props: {
        isLoginPage: Boolean,
        isRegPage: Boolean
    },
    computed: {
        loggedIn(){
            return this.$store.state.auth.user.status.loggedIn 
        },
        nameErrors(){
            const errors = []
            !this.$v.user.name.required && errors.push('Your Name is required')
            return errors
        },
        emailErrors() {
            const errors = []
            !this.$v.user.email.email && errors.push('Must be valid e-mail')
            !this.$v.user.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors(){
            const errors = []
            !this.$v.user.password.minLength && errors.push(`Password must have at least 8 letters.`)
            !this.$v.user.password.required && errors.push('Password is required')
            return errors
        },
        validInput(){
            if (this.$v.user.name.required && this.$v.user.email.email && this.$v.user.password.required) {
                return false 
            } else {
                return true
            }
        }
    },
    mounted() {
        if(!this.loggedIn && this.isLoginPage){
            this.$router.push({name: 'Home'}).catch(() => {})
        } else if (!this.loggedIn && this.isRegPage) {
            this.$router.push({ path: '/register'}).catch(() => {}) 
        }
    },
    created() {
        if(this.loggedIn){
            this.$router.push({ path: '/todo' }).catch(() => {})
        }    
    },
    methods: {
        handleLogin(){
            this.loading = true
            this.$store.dispatch('auth/login', this.user).then(
                () => {
                    this.$store.dispatch('tasks/myTodos')
                    return this.$router.push({ path: '/todo' }).catch(() => {})
                },
                error => {
                    this.alert = true
                    this.showError = true
                    this.loading = false
                    return error
                }
            )
        },
        handleRegister(){
            this.loading = true
            this.$store.dispatch('auth/register', this.user).then(
                data => {
                    this.message = data.message
                    this.successful = true
                    this.loading = false
                },
                error => {
                    console.log(error);
                    this.message = error.key
                    this.successful = false
                    this.loggedIn = false
                }
            )
        },
        registerPage() {
            this.$router.push({ path: '/register'}).catch(() => {})
        },
        loginPage() {
            this.$router.push({ name: 'Home' }).catch(() => {})
        }
    },
}
</script>

<style>

</style>