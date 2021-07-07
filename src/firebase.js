import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCPmw8ecRrn4ITe0ZjYBrIBcF_Kim52WXo",
  authDomain: "tanui-industries-ims.firebaseapp.com",
  databaseURL: "https://tanui-industries-ims-default-rtdb.firebaseio.com",
  projectId: "tanui-industries-ims",
  storageBucket: "tanui-industries-ims.appspot.com",
  messagingSenderId: "318234903493",
  appId: "1:318234903493:web:9b667eec85c1540c2901ac",
  measurementId: "G-LWR7YM12HP"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()


export default firebase