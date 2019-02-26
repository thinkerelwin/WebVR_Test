import Vuex from 'vuex'
import firebase from '../plugins/firebase'

const VRCamFirebase = firebase.database()
// console.log(VRCamFirebase)

const store = () => {
  return new Vuex.Store({
    state: () => ({
      PanoramasRawData: []
    }),
    mutations: {
      setPanoramasRawData(state, rawData) {
        state.PanoramasRawData = rawData
      }
    },
    actions: {
      getPanoramasList({ commit }, id) {
        try {
          VRCamFirebase.ref('/panoramas')
            .orderByChild('Building')
            .equalTo(id)
            .once('value', snapshot => {
              // console.log(snapshot.val())
              commit('setPanoramasRawData', snapshot.val())
            })
        } catch (err) {
          console.log(err)
        }
      }
    },
    getters: {
      currentPanoramasList: state => {
        const Panoramas = state.PanoramasRawData
        const sortedPanoramasIDList = Object.keys(Panoramas).sort((a, b) => {
          return Panoramas[a].data.index - Panoramas[b].data.index
        })

        return sortedPanoramasIDList.map(id => {
          return {
            id: id,
            desktopUrl: Panoramas[id].data.desktopUrl,
            thumbnail: Panoramas[id].data.thumbnail,
            category: Panoramas[id].data.category
          }
        })
      }
    }
  })
}

export default store
