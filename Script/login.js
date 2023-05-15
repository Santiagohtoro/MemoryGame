
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXSh0QIZhI8gGgejGEt2axn39m0JZiZnE",
  authDomain: "memorygame-97e68.firebaseapp.com",
  databaseURL: "https://memorygame-97e68-default-rtdb.firebaseio.com",
  projectId: "memorygame-97e68",
  storageBucket: "memorygame-97e68.appspot.com",
  messagingSenderId: "1014281328293",
  appId: "1:1014281328293:web:035d98b1d227dfbd2b9f4c",
  measurementId: "G-57G1EXF8YX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database(); // Para Firestore, o firebase.database() para Realtime Database

function login() {
  const correo = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  auth.signInWithEmailAndPassword(correo, password)
    .then(function () {
      let user = auth.currentUser;
      let database_ref = database.ref();
      const date = new Date();

      var user_data = {
        last_login: date.toLocaleString(),
      }

      database_ref.child('users/' + user.uid).update(user_data);
      sessionStorage.setItem('user_uid',user.uid);
      window.location.href = 'index.html';
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
    });
}
