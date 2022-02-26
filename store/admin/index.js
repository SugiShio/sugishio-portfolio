import User from '@/models/user'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, { user }) {
    state.user = user
  },
}

export const actions = {
  updateUser({ commit }, { user }) {
    commit('setUser', { user: new User(user) })
  },
}

export const getters = {
  isSignin(state) {
    return state.user !== null
  },
}
