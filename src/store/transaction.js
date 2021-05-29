import {
    createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        transactions: [],
        transaction: {},
        error: {}
    },
    mutations: {
        SET_TRANSACTIONS(state, value) {
            state.transactions = value
        },

        SET_TRANSACTION_DETAIL(state, value) {
            state.transaction = value
        },

        DELETE_TRANSACTION(state, value) {
            state.transactions.splice(value, 1);
        },

        SET_ERROR(state, value) {
            state.error = value
        }
    },
    actions: {
        async index({
            commit,
        }) {
            await axios.get('http://localhost:8000/api/transaction')
                .then((result) => {
                    commit('SET_TRANSACTIONS', result.data.data)
                })
                .catch(() => {
                    commit('SET_TRANSACTIONS', [])
                })
        },

        async store({
            commit,
        }, transaction) {
            return await axios.post('http://localhost:8000/api/transaction', transaction)
                .catch((error) => {
                    commit('SET_ERROR', error.response.data)
                })
        },

        async show({
            commit,
        }, id) {
            await axios.get(`http://localhost:8000/api/transaction/${id}`)
                .then((result) => {
                    commit('SET_TRANSACTION_DETAIL', result.data.data)
                })
                .catch(() => {
                    commit('SET_TRANSACTION_DETAIL', {})
                })
        },

        async update({
            commit,
        }, transaction) {
            return await axios.put(`http://localhost:8000/api/transaction/${transaction.id}`, transaction)
                .catch((error) => {
                    commit('SET_ERROR', error.response.data)
                })
        },

        async destroy({
            commit,
        }, {
            id,
            index
        }) {
            await axios.delete(`http://localhost:8000/api/transaction/${id}`)
                .then(() => {
                    commit('DELETE_TRANSACTION', index)
                })
        },
    },
})