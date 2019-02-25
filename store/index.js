import Vuex from 'vuex'
import firebase from '../plugins/firebase'

const VRCamFirebase = firebase.database()
console.log(VRCamFirebase)

const store = () => {
  return new Vuex.Store({
    state: () => ({
      currentPanoramasList: []
    }),
    mutations: {
      setPanoramasList(state, list) {
        state.currentPanoramasList = list
        // state.currentPanorama = list
      }
      // setDeviceId(state, UID) {
      //   state.globalSetting.DeviceId = UID
      // },
      // setFundWarning(state, message) {
      //   state.fundWarning = message
      // }
    },
    actions: {
      getPanoramasList({ commit }) {
        try {
          VRCamFirebase.ref('/panoramas')
            .orderByChild('Building')
            .equalTo('cc242ca9-17a3-47e5-bdd9-a12582e90752')
            .once('value', snapshot => {
              console.log(snapshot.val())

              const Panoramas = snapshot.val()
              const sortedPanoramasListID = Object.keys(Panoramas).sort(
                (a, b) => {
                  return Panoramas[a].data.index - Panoramas[b].data.index
                }
              )
              const panoramaList = sortedPanoramasListID.map(id => {
                return {
                  id: id,
                  desktopUrl: Panoramas[id].data.desktopUrl,
                  thumbnail: Panoramas[id].data.thumbnail,
                  category: Panoramas[id].data.category
                }
              })
              commit('setPanoramasList', panoramaList)
            })
        } catch (err) {
          console.log(err)
        }
      }
      // async generateDeviceId({ commit }) {
      //   await commit('setDeviceId', require('uuid/v1')())
      // },
      // // applyFundWarning({ commit }, message) {
      // //   commit('setFundWarning', message)
      // // },
      // async nuxtServerInit({ dispatch, commit }, { app }) {
      //   const DeviceID = app.$cookies.get('DID')
      //   if (DeviceID) {
      //     commit('setDeviceId', DeviceID)
      //   } else {
      //     dispatch('generateDeviceId')
      //   }
      // }
    },
    getters: {
      // completeUrl: state => {
      //   return state.globalSetting.apiUrl
      // }
    }
  })
}

export default store
