const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");


const firebaseConfig = {
  apiKey: "AIzaSyCXnpYVfn1vpNdqVYrfOV8ow8pZhtnTHJE",
  authDomain: "nodejs-13af7.firebaseapp.com",
  projectId: "nodejs-13af7",
  storageBucket: "nodejs-13af7.appspot.com",
  messagingSenderId: "614148690405",
  appId: "1:614148690405:web:fbd978f94aad3075735f0c",
  measurementId: "G-3S7Y482K5W"
};


const app = initializeApp(firebaseConfig);
exports.auth = getAuth(app);
module.exports = app;

