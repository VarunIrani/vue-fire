import {initializeApp} from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyCXFyvOYPvGiJgSo-EldBIcShpvMsIx63o",
  authDomain: "fir-vue-314d6.firebaseapp.com",
  databaseURL: "https://fir-vue-314d6.firebaseio.com",
  projectId: "fir-vue-314d6",
  storageBucket: "",
  messagingSenderId: "75211674539"
});

export const db = app.database();
export const namesRef = db.ref('names');