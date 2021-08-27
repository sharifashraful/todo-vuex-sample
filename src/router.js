import Vue from 'vue'
import Router from 'vue-router'
import Home  from './views/Home.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todo',
            name: 'TodolistView',
            component: () => import('./views/TodolistView.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('./views/Register.vue')
        },
    ]
})