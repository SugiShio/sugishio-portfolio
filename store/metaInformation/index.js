import { MetaInformation } from '~/utils/metaInformation'

export const state = () => ({
  metaInformation: null
})

export const mutations = {
  setMetaInformation(state, { metaInformation }) {
    state.metaInformation = new MetaInformation(metaInformation)
  }
}

export const actions = {
  updateMetaInformation({ commit, state }, { key, value }) {
    commit('setMetaInformation', {
      metaInformation: { ...state.metaInformation, [key]: value }
    })
  }
}
