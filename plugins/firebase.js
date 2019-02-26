import firebase from 'firebase'
import serviceAccount from '../server/config/keys'

const config = {
  databaseURL: 'https://vr-cam-161603.firebaseio.com',
  serviceAccount: serviceAccount
}

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app())
