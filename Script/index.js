window.addEventListener("load", function () {
  if (sessionStorage.getItem("user_uid") == null) {
    location.replace("./login.html");
  }
  const start = document.querySelector(".btnStart");
  const reset = document.querySelector(".btnReset");
  const cardContainer = document.querySelector(".card-grid");
  var tabla = document.getElementById("verbs-table");
  var celdas = tabla.getElementsByTagName("td")

  const verbs = [
    {
      id: "1",
      verb: ["be", "was/were", "been"],
    },
    {
      id: "2",
      verb: ["buy", "bought", "bought"],
    },
    {
      id: "3",
      verb: ["begin", "began", "begun"],
    },
    {
      id: "4",
      verb: ["drive", "drove", "driven"],
    },
    {
      id: "5",
      verb: ["drink", "drank", "drunk"],
    },
    {
      id: "6",
      verb: ["feel", "felt", "felt"],
    },
    {
      id: "7",
      verb: ["draw", "drew", "drawn"],
    },
    {
      id: "8",
      verb: ["dig", "dug", "dug"],
    },
    {
      id: "9",
      verb: ["eat", "ate", "eaten"],
    },
    {
      id: "10",
      verb: ["choose", "chosen", "chosen"],
    },
  ];

  //FireBase
  const firebaseConfig = {
    apiKey: "AIzaSyDXSh0QIZhI8gGgejGEt2axn39m0JZiZnE",
    authDomain: "memorygame-97e68.firebaseapp.com",
    databaseURL: "https://memorygame-97e68-default-rtdb.firebaseio.com",
    projectId: "memorygame-97e68",
    storageBucket: "memorygame-97e68.appspot.com",
    messagingSenderId: "1014281328293",
    appId: "1:1014281328293:web:035d98b1d227dfbd2b9f4c",
    measurementId: "G-57G1EXF8YX",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  var nuevosDatos = {
    status: "inside",
  };
  const userData = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid"));
  const userName = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid") + "/nombre");
  const studentData = firebase
    .database()
    .ref('users/' + sessionStorage.getItem('user_uid') + '/students/');
  userData.update(nuevosDatos);
  userData.on("value", function (snapshot) {
    const dataInfo = snapshot.val();
    sessionStorage.setItem("user", JSON.stringify(dataInfo));
  });

  userName.on("value", function (snapshot) {
    document.getElementById("tagUser").innerText =  snapshot.val();
  });

  studentData.on("value", function (snapshot) {
    const dataInfo = snapshot.val()
    sessionStorage.setItem("students", JSON.stringify(dataInfo))
  });

  //Cartas funcionalidades
  cardsMapping();
  shuffleCards();
  start.addEventListener("click", function () {
    const audio = new Audio("./static/music/tema-principal.mp3");
    audio.volume = 0.2;
    audio.addEventListener("ended", function () {
      // Reinicia la reproducción del audio al finalizar
      audio.currentTime = 0;
      audio.play();
    });

    audio.play();

    jugadores[0].nombre = document.getElementById("nombre-jugador-1").value;
    jugadores[1].nombre = document.getElementById("nombre-jugador-2").value;
    jugadores[2].nombre = document.getElementById("nombre-jugador-3").value;

    // Mostrar los nombres de los jugadores en la pantalla

    document.getElementById("puntajes").innerHTML = `
            <p>${jugadores[0].nombre}: ${jugadores[0].puntaje}</p>
            <p>${jugadores[1].nombre}: ${jugadores[1].puntaje}</p>
            <p>${jugadores[2].nombre}: ${jugadores[2].puntaje}</p>
            
          `;

    const cards = document.querySelectorAll(".card");
    let flippedCards = [];

    cards.forEach((card) => card.addEventListener("click", flipCard));

    function flipCard(e) {
      let verbFlipped =[]
      
      if (flippedCards.length < 3) {
        this.classList.add("flipped");
        flippedCards.push(this);
      }
      console.log(flippedCards);
      if (flippedCards.length === 3) {
        const isSameValue =
          flippedCards[0].dataset.value === flippedCards[1].dataset.value &&
          flippedCards[1].dataset.value === flippedCards[2].dataset.value &&
          flippedCards[0].dataset.verb !== flippedCards[1].dataset.verb;
        console.log();
       
        if (isSameValue) {
          //continua 
          tacharceldas(flippedCards[0].dataset.value)
      
          flippedCards.forEach((card) => {
            
            card.removeEventListener("click", flipCard)
            const audioScore = new Audio("./static/music/super-mario-score.mp3");
            audioScore.volume = 0.5;
            audioScore.play();
          }
          );
          //primer cambio
          jugadores[currentPlayer].puntaje++;
          document.getElementById("puntajes").innerHTML = `
             <p${currentPlayer === 0 ? ' class="current-player"' : ""}>${jugadores[0].nombre
            }: ${jugadores[0].puntaje}</p>
             <p${currentPlayer === 1 ? ' class="current-player"' : ""}>${jugadores[1].nombre
            }: ${jugadores[1].puntaje}</p>
             <p${currentPlayer === 2 ? ' class="current-player"' : ""}>${jugadores[2].nombre
            }: ${jugadores[2].puntaje}</p>
               `;
          flippedCards = [];
          ganador();
        } else {
          setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));
            flippedCards = [];
            //segundo cambio
            currentPlayer = (currentPlayer + 1) % 3;
            document.getElementById("puntajes").innerHTML = `
             <p${currentPlayer === 0 ? ' class="current-player"' : ""}>${jugadores[0].nombre
              }: ${jugadores[0].puntaje}</p>
             <p${currentPlayer === 1 ? ' class="current-player"' : ""}>${jugadores[1].nombre
              }: ${jugadores[1].puntaje}</p>
             <p${currentPlayer === 2 ? ' class="current-player"' : ""}>${jugadores[2].nombre
              }: ${jugadores[2].puntaje}</p>
           `;
          }, 1000);
        }
      }

      if (flippedCards.length === 3) {
        const isSameValue =
          flippedCards[0].dataset.value === flippedCards[1].dataset.value &&
          flippedCards[1].dataset.value === flippedCards[2].dataset.value &&
          flippedCards[0].dataset.verb !== flippedCards[1].dataset.verb;

        if (isSameValue) {
          flippedCards.forEach((card) =>
            card.removeEventListener("click", flipCard)
          );
          flippedCards = [];
          jugadores.forEach((jugador) => {
            if (jugador.nombre === currentPlayer) {
              jugador.puntaje++;
              document.getElementById("puntajes").innerHTML = `
              <p>${jugadores[0].nombre}: ${jugadores[0].puntaje}</p>
              <p>${jugadores[1].nombre}: ${jugadores[1].puntaje}</p>
              <p>${jugadores[2].nombre}: ${jugadores[2].puntaje}</p>
            `;
            }
          });
        } else {
          setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));
            flippedCards = [];
          }, 1000);
        }
      }
    }
    start.removeEventListener("click", arguments.callee);
  });

  let jugadores = [
    { nombre: "", puntaje: 0 },
    { nombre: "", puntaje: 0 },
    { nombre: "", puntaje: 0 },
  ];
  let currentPlayer = 0;
  //let currentPlayerIndex = 0;
  //let flippedCards = [];

  function shuffleCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      let randomPosition = Math.floor(Math.random() * cards.length);
      card.style.order = randomPosition;
    });
  }

  function ganador() {
    // Verificar si la suma de puntajes es igual a 10
    const totalPuntajes = jugadores.reduce(
      (sum, jugador) => sum + jugador.puntaje,
      0
    );
    if (totalPuntajes === 10) {
      // Buscar al jugador con mayor puntaje
      let maxPuntaje = 0;
      let ganador = null;
      let win = 0;
      for (let i = 0; i < jugadores.length; i++) {
        if (jugadores[i].puntaje > maxPuntaje) {
          maxPuntaje = jugadores[i].puntaje;
          ganador = jugadores[i];
          //Nuevo Array
          let ganadorName = ganador.nombre;
          let ganadorScore = ganador.puntaje;
          win = 1;

          const winnerArray = [{
            studentName: ganadorName,
            score: ganadorScore,
            win: win,
          }];

          //Firebase student
          const databaseRef = firebase.database().ref('users/' + sessionStorage.getItem('user_uid') + '/students/');

          function updateDatabaseData() {
            // Obtener los datos de la base de datos en tiempo real
            databaseRef.once('value', snapshot => {
              const databaseData = snapshot.val();

              // Verificar y actualizar los datos si el studentName coincide en ambos JSON
              for (let i = 0; i < winnerArray.length; i++) {
                const localEntry = winnerArray[i];
                const { studentName, score, win } = localEntry;

                if (databaseData && databaseData[studentName]) {
                  // Sumar los valores del JSON local y el JSON de la base de datos
                  const updatedScore = score + databaseData[studentName].score;
                  const updatedWin = win + databaseData[studentName].win;

                  // Actualizar los valores en el JSON de la base de datos
                  databaseRef.child(`/${studentName}`).update({ score: updatedScore, win: updatedWin });
                  console.log("Registro enviado");
                } else{
                  databaseRef.child(`/${studentName}`).set({
                      studentName: studentName,
                      score: score,
                      win: 1,
                    });
                }
              }
            });
          }
          updateDatabaseData();
          //Estudiante Ganador
          Swal.fire({
            title: `¡${ganador.nombre} ha ganado con ${ganador.puntaje} puntos!`,
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(() => {
            // Detener el juego
          });
        }
      }
    }
  }

  function cardsMapping() {
    verbs.forEach((element) => {
      cardContainer.innerHTML += `
      <div class="card" data-verb="${element.verb[0]}" data-value="${element.id}">
      <div class="card-flipper">
        <div class="card-front">?</div>
        <div class="card-back">${element.verb[0]}</div>
      </div>
    </div>
    <div class="card" data-verb="${element.verb[1]}" data-value="${element.id}">
      <div class="card-flipper">
        <div class="card-front">?</div>
        <div class="card-back">${element.verb[1]}</div>d

      </div>
    </div>
    <div class="card" data-verb="${element.verb[2]}" data-value="${element.id}">
      <div class="card-flipper">
        <div class="card-front">?</div>
        <div class="card-back">${element.verb[2]}</div>
      </div>
    </div>`;
    });
  }

  reset.addEventListener("click", reiniciarPartida);
  function reiniciarPartida() {
    const audioGameover = new Audio("./static/music/game-over-song.mp3");
    audioGameover.play();
    setTimeout(() => {
      window.location.href = "index.html"; // redirige a la página principal
    }, 2000);
  }

  cerrarSession();
  function cerrarSession() {
    const btnSalir = document.querySelector(".logout");
    btnSalir.addEventListener("click", function () {
      var salir = {
        status: "out",
      };
      userData.update(salir);
      sessionStorage.clear();
      location.replace("./login.html");
    });
  }

  rankingDirection();

  function rankingDirection() {
    const btnRanking = document.querySelector('.btnRanking');
    btnRanking.addEventListener('click', () => {
      location.replace("./top.html");
    })
  }
  createVerbRow()
  //lista de verbos
  function createVerbRow() {
    const verbsTable = document.getElementById("verbs-table");
    
    verbs.forEach((element) => {

        verbsTable.innerHTML += `
        <tr>
          <td data-id="${element.id}">${element.verb[0]}</td>
          <td data-id="${element.id}">${element.verb[1]}</td>
          <td data-id="${element.id}">${element.verb[2]}</td>
        </tr>
      `;
      })
  };
  
  function tacharceldas(palabraBuscada) {
    for (var i = 0; i < celdas.length; i++) {
      var dataId = celdas[i].getAttribute("data-id");
      console.log(dataId);
      if (dataId === palabraBuscada) {
        // Tachar la palabra
        celdas[i].innerHTML = "<s>" + celdas[i].innerHTML + "</s>";
      }
    }
  }
  

});



function abrirPopUp() {
  const open = document.getElementById("btnOpen");
  const modal_container = document.getElementById("modal_container");
  const close = document.getElementById("btnClose");

  open.addEventListener("click", () => {
    modal_container.classList.add("show");
  });

  close.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });
}
