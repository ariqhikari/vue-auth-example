import {
    createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        authStatus: false,
        user: null,
        error: {}
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authStatus = value
        },

        SET_USER(state, value) {
            state.user = value
        },

        SET_ERROR(state, value) {
            state.error = value
        }
    },
    actions: {
        async login({
            commit,
            dispatch
        }, credentials) {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie')
            await axios.post('http://localhost:8000/login', credentials)
                .catch((error) => {
                    commit('SET_ERROR', error.response.data.errors)
                })

            dispatch('user')
        },

        async register({
            commit,
            dispatch
        }, credentials) {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie')
            await axios.post('http://localhost:8000/register', credentials)
                .catch((error) => {
                    commit('SET_ERROR', error.response.data.errors)
                })

            dispatch('user')
        },

        async logout({
            commit
        }) {
            await axios.post('http://localhost:8000/logout')
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
        },

        async forgotPassword({
            commit
        }, credentials) {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie')
            await axios.post('http://localhost:8000/forgot-password', credentials)
                .catch((error) => {
                    commit('SET_ERROR', error.response.data.errors)
                })
        },

        async user({
            commit
        }) {
            await axios.get('http://localhost:8000/api/user')
                .then((result) => {
                    commit('SET_AUTHENTICATED', true)
                    commit('SET_USER', result.data)
                })
                .catch((error) => {
                    commit('SET_AUTHENTICATED', false)
                    commit('SET_USER', null)
                })
        }
    },
})