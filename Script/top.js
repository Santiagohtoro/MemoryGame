  window.addEventListener("load", function () {
    if (sessionStorage.getItem("user_uid") == null) {
      location.replace("./login.html");
    }
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

    const database = firebase.database(); // Para Firestore, o firebase.database() para Realtime Database
    const userData = firebase.database().ref('users/' + sessionStorage.getItem('user_uid'));
    const studentData = firebase.database().ref('users/' + sessionStorage.getItem('user_uid') + '/students/');

    studentData.on("value", function (snapshot) {
      const dataInfo = snapshot.val()
      sessionStorage.setItem("students", JSON.stringify(dataInfo))
    });

    let data = JSON.parse(sessionStorage.getItem('user'));
    students = JSON.parse(sessionStorage.getItem('students'));
    let userName = data.nombre;
    var studentsData = Object.values(students);

    document.getElementById('tagUser').innerHTML = userName;

    var position = document.getElementById('listPosition'),
      player = document.getElementById('listPlayer'),
      score = document.getElementById('listScore'),
      wins = document.getElementById('listWins');

    ranking()
    function ranking() {
      studentsData.sort(function (a, b) {
        return b.win - a.win;
      });

      for (var i = 0; i < studentsData.length; i++) {
        var item = studentsData[i];
        var listPosition = document.createElement('tr'),
          listUser = document.createElement('tr'),
          listScore = document.createElement('tr'),
          listWins = document.createElement('tr');

        //Variales que las contiene
        listPosition.textContent = [(i + 1)];
        listUser.textContent = studentsData[i].studentName;
        listScore.textContent = studentsData[i].score;
        listWins.textContent = studentsData[i].win;

        //Impresion
        position.appendChild(listPosition);
        player.appendChild(listUser);
        score.appendChild(listScore);
        wins.appendChild(listWins);
      }
    }

    cerrarSession()
    function cerrarSession() {
      const btnSalir = document.querySelector("#logout");
      btnSalir.addEventListener("click", function () {
        var salir = {
          status: "out"
        };
        userData.update(salir)
        sessionStorage.clear();
        location.replace("./login.html")
      })
    }

    backGame()
    function backGame() {
      const btnBack = document.getElementById('backGame');
      btnBack.addEventListener("click", () => {
        location.replace("./index.html");
      })
    }
  })
