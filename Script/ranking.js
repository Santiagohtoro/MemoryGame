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
const userData = firebase.database().ref('users/' + sessionStorage.getItem('user_uid') + '/students/');

userData.on("value", function (snapshot) {
    const dataInfo = snapshot.val()
    sessionStorage.setItem("students", JSON.stringify(dataInfo))
});

let user_uid = sessionStorage.getItem('user_uid');
let data = JSON.parse(sessionStorage.getItem('user'));
students = JSON.parse(sessionStorage.getItem('students'));
let userName = data.nombre;
var studentsData = Object.values(students);
console.log(studentsData);

document.getElementById('tagUser').innerHTML = userName;

let name = document.querySelector('nameLabel'),
    score = document.querySelector('scoreLabel'),
    win = document.querySelector('winLabel');

var topList = document.getElementById("topList");

ranking()

function ranking() {
    studentsData.sort(function (a, b) {
        console.log(b.score - a.score)
    });

    console.log('Ranking: ');
    for (var i = 0; i < studentsData.length; i++) {
        console.log((i + 1) + ". " + studentsData[i].studentName + " - Puntuación: " + studentsData[i].score);
        var item = studentsData[i];
        var listItem = document.createElement("li");
        listItem.textContent = studentsData[i].studentName + " - Puntuación: " + studentsData[i].score;
        topList.appendChild(listItem);
    }
}

cerrarSession()
function cerrarSession() {
    const btnSalir = document.querySelector(".logout")
    btnSalir.addEventListener("click", function () {
        var salir = {
            status: "out"
        };
        userData.update(salir)
        sessionStorage.clear();
        location.replace("./login.html")
    })
}
