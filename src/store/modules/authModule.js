import AuthService from '../../services/auth.service'

// const initialState = state.userData
//   ? { status: { loggedIn: true },  data: state.userData}
//   : { status: { loggedIn: false }, data: null};

const state = {
    user: { status: { loggedIn: false }, data: null}
}

const getters = {
    showUser: (state) => {
        console.log(state.user);
        return state.user
    }
}

const mutations = {
    loginSuccess(state) {
        state.user.status.loggedIn = true,
        state.user.data = JSON.parse(localStorage.getItem('user'));
    },

    loginFailure(state) {
        state.user.status.loggedIn = false,
        state.user.data = null
    },

    logout(state) {
        state.user.status.loggedIn = false
        state.user.data = null
    },

    registerSuccess(state) {
        state.user.status.loggedIn = false
    },

    registerFailure(state) {
        state.user.status.loggedIn = false
    }
}

const actions = {
    login({commit}, userData) {
        return AuthService.login(userData).then(
            user => {
                commit('loginSuccess')
                return Promise.resolve(user)
            },
            error => {
                commit('loginFailure')
                console.log(error);
                return Promise.reject(error)
            }
        )
    },

    register({commit}, userData) {
        return AuthService.register(userData).then(
            response => {
                commit('registerSuccess')
                return Promise.resolve(response.data)
            },
            error => {
                commit('registerFailure')
                return Promise.reject(error)
            }
        )
    },

    async logout({commit}) {
        const data = await JSON.parse(localStorage.getItem('user'))
        const token = data.token
        await AuthService.logout(token)
        await commit('logout')

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}