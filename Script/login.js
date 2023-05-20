
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

function validarSession(uid, callback) {
  const userData = firebase.database().ref('users/' + uid);

  userData.on("value", function (snapshot) {
    const data = snapshot.val();
    console.log(JSON.stringify(data.status));
    if (data?.status !== "inside") {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function login() {
  const correo = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  auth.signInWithEmailAndPassword(correo, password)
    .then(function () {
      let user = auth.currentUser;
      let database_ref = database.ref();
      const date = new Date();
      validarSession(user.uid, function (resultado) {
        if(resultado === true){
          var user_data = {
            last_login: date.toLocaleString(),
            status: "inside"
          }
    
          database_ref.child('users/' + user.uid).update(user_data);
    
          console.log('Usario ingreso');
          console.log(user);
          sessionStorage.setItem('user_uid',user.uid);
          window.location.href = 'index.html';
        }
        if(resultado !== true){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Este usuario ya tiene una seccion activa"
          })
          setTimeout(() => {
            location.reload()
          }, 2000);
          
        }
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })
    });
    /*
    }*/
    
}
