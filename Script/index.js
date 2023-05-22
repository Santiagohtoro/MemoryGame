window.addEventListener("load", function () {
  if (sessionStorage.getItem("user_uid") == null) {
    location.replace("./login.html");
  }
  const start = document.querySelector(".start");
  const reset = document.querySelector(".reset");
  const cardContainer = document.querySelector(".card-grid");
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
  var nuevosDatos = {
    status: "inside",
  };
  const userData = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid"));
  const userName = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid") + "/nombre");
  userData.update(nuevosDatos);
  userData.on("value", function (snapshot) {
    console.log(snapshot.val());
    const dataInfo = snapshot.val();
    sessionStorage.setItem("user", JSON.stringify(dataInfo));
  });

  userName.on("value", function (snapshot) {
    console.log(snapshot.val());

    document.getElementById("tagUser").innerText = "Usuario: " + snapshot.val();
  });

  //Cartas funcionalidades

  cardsMapping();
  shuffleCards();
  start.addEventListener("click", startGame);

  function createGame(players) {
    var gameRef = firebase.database().ref("game/").push();

    var partida = {
      players,
      estado: "en_curso",
    };

    gameRef
      .set(partida)
      .then(() => {
        console.log("Partida creada con ID:", gameRef.key);
        return gameRef.key; // Devuelve el ID de la partida
      })
      .catch((error) => {
        console.error("Error al crear la partida:", error);
        return null;
      });
  }

  // Función para actualizar la puntuación de un jugador en la base de datos
  function actualizarPuntuacionJugador(jugadorId, nuevaPuntuacion) {
    // Obtén una referencia al nodo del jugador que deseas actualizar
    const jugadorRef = firebase.database().ref("jugadores").child(jugadorId);

    // Actualiza la puntuación del jugador en la base de datos
    jugadorRef
      .update({ puntuacion: nuevaPuntuacion })
      .then(() => {
        console.log("Puntuación del jugador actualizada correctamente");
      })
      .catch((error) => {
        console.error("Error al actualizar la puntuación del jugador:", error);
      });
  }

  function startGame() {
    jugadores[0].nombre = document.getElementById("nombre-jugador-1").value;
    jugadores[1].nombre = document.getElementById("nombre-jugador-2").value;
    jugadores[2].nombre = document.getElementById("nombre-jugador-3").value;

    // Mostrar los nombres de los jugadores en la pantalla

    document.getElementById("puntajes").innerHTML = `
            <p>${jugadores[0].nombre}: ${jugadores[0].puntaje}</p>
            <p>${jugadores[1].nombre}: ${jugadores[1].puntaje}</p>
            <p>${jugadores[2].nombre}: ${jugadores[2].puntaje}</p>
            
          `;
    console.log(jugadores);
    const idPartida = createGame(jugadores);
    const cards = document.querySelectorAll(".card");
    let flippedCards = [];

    cards.forEach((card) => card.addEventListener("click", flipCard));

    function flipCard(e) {
      if (flippedCards.length < 3) {
        this.classList.add("flipped");
        flippedCards.push(this);
      }

      if (flippedCards.length === 3) {
        const isSameValue =
          flippedCards[0].dataset.value === flippedCards[1].dataset.value &&
          flippedCards[1].dataset.value === flippedCards[2].dataset.value &&
          flippedCards[0].dataset.verb !== flippedCards[1].dataset.verb;
        console.log();

        if (isSameValue) {
          flippedCards.forEach((card) =>
            card.removeEventListener("click", flipCard)
          );
          //primer cambio
          jugadores[currentPlayer].puntaje++;
          document.getElementById("puntajes").innerHTML = `
             <p${currentPlayer === 0 ? ' class="current-player"' : ""}>${
            jugadores[0].nombre
          }: ${jugadores[0].puntaje}</p>
             <p${currentPlayer === 1 ? ' class="current-player"' : ""}>${
            jugadores[1].nombre
          }: ${jugadores[1].puntaje}</p>
             <p${currentPlayer === 2 ? ' class="current-player"' : ""}>${
            jugadores[2].nombre
          }: ${jugadores[2].puntaje}</p>
               `;
          flippedCards = [];
        } else {
          setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));
            flippedCards = [];
            //segundo cambio
            currentPlayer = (currentPlayer + 1) % 3;
            document.getElementById("puntajes").innerHTML = `
             <p${currentPlayer === 0 ? ' class="current-player"' : ""}>${
              jugadores[0].nombre
            }: ${jugadores[0].puntaje}</p>
             <p${currentPlayer === 1 ? ' class="current-player"' : ""}>${
              jugadores[1].nombre
            }: ${jugadores[1].puntaje}</p>
             <p${currentPlayer === 2 ? ' class="current-player"' : ""}>${
              jugadores[2].nombre
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

    function initGame() {
      // Remover la clase "flipped" de todas las cartas
      cards.forEach((card) => card.classList.remove("flipped"));

      // Mezclar y asignar valores de las cartas
      // ...
    }
    /*
      cardValues.forEach((value) => {
        const valueCards = document.querySelectorAll(
          `.card[data-value="${value}"]`
        );
        if (valueCards.length === 3) {
          valueCards.forEach((card) => {
            card.classList.add("flipped");
            card.removeEventListener("click", flipCard);
          });
        }
      });*/
  }

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
    window.location.href = "index.html"; // redirige a la página principal
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
});
