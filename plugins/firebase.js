import firebase from 'firebase'
// const serviceAccount = require('./config/keys')
// import serviceAccount from '../server/config/serviceAccountKey.json'
import serviceAccount from '../server/config/keys'

const config = {
  databaseURL: 'https://vr-cam-161603.firebaseio.com',
  serviceAccount: serviceAccount
}

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app())
