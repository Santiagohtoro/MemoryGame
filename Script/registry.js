
window.addEventListener("load", function () {
  var form = document.forms[0]
  const nombre = document.querySelector("#nameInput");
  const correo = document.getElementById('emailInput');
  const password = document.getElementById('passwordInput');
  const reviewPassword = document.getElementById('reviewPassword');
  let message = []
  form.reset();
  verificarCheck()
  form.addEventListener('submit', function (e) {
    let pass=password.value;
    let email= correo.value;
    let name= nombre.value;
    let review= reviewPassword.value;
    console.log(pass,email,name, review)
    e.preventDefault();
    if (name.length < 8) {
      message.push("El nombre debe tener al menos 8 caracteres");
    } 
    if (pass.length < 8) {
      message.push("Hacer la contraseña mas larga");
    } 
    if (!pass.match(/[a-z]/) && !pass.match(/[A-Z]/)) {
      message.push(" La contraseña debe tener al menos una letra mayuscula y minuscula");
    }
    if (!pass.match(/\d/)) {
      message.push("La contraseña debe tener al menos un numero");
    }
    if (!pass.match(/[^a-zA-Z\d]/)) {
      message.push("La contraseña debe tener al menos un caracter especial");
    }
    if (review.length == 0) {
      message.push("El campo repite tu contraseña esta vacio");
    }
    if (review != pass) {
      message.push("Las contraseñas no son iguales");
    }
    
    if(message.length>0){
      let messageConcat="";
      message.forEach(element => {
        messageConcat += element + '<br>';
      });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        width: 500,
        html: messageConcat
      })
      message=[]
      messageConcat=''
    }else{
      registrarse()
      
    }
  })

  function verificarCheck() {
    //Campo terminos
    const selectTerms = document.getElementById('selectTermsConditions'),
        btnSend = document.getElementById('btnSend');

    selectTerms.addEventListener('change', function () {
        if (this.checked) {
            btnSend.disabled = false;
            btnSend.style.opacity = 1;
        } else {
            btnSend.disabled = true;
            btnSend.style.opacity = 0.5;
        }
    });
}
  //Configuracion de conexion de base de datos
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

  const auth = firebase.auth();//instancia de autenticacion
  const database = firebase.database(); // firebase.database() para Realtime Database
  // funcion registro con instancias para almacenar valores en base de datos
  function registrarse() {
      const nombre = document.querySelector("#nameInput");
      const correo = document.getElementById('emailInput');
      const password = document.getElementById('passwordInput');
      
      auth.createUserWithEmailAndPassword(correo.value, password.value)
      .then(function () {
          let user = auth.currentUser;
          //let database_ref =  database.ref();
          const date = new Date();
          var user_data = {
              email: correo.value,
              nombre: nombre.value,
              score:0,
              last_login: date.toLocaleString(),
              status: "logged"
          };
          
          database.ref('users/'+ user.uid).set(user_data);
          registroCorrecto()
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        })
      }
    );
     
    function registroCorrecto() {
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        
      }, 1000);
      
    }
  }

});