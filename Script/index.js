  window.addEventListener("load", function () {
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
    cardsMapping();
    shuffleCards();
    start.addEventListener("click", function () {
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

      function flipCard() {
        if (flippedCards.length < 3) {
          this.classList.add("flipped");
          flippedCards.push(this);
        }

        if (flippedCards.length === 3) {
          const isSameValue =
            flippedCards[0].dataset.value === flippedCards[1].dataset.value &&
            flippedCards[1].dataset.value === flippedCards[2].dataset.value;

          if (isSameValue) {
            flippedCards.forEach((card) =>
              card.removeEventListener("click", flipCard)
            );
            //primer cambio
            jugadores[currentPlayer].puntaje++;
            document.getElementById("puntajes").innerHTML = `
            <p${currentPlayer === 0 ? ' class="current-player"' : ''}>${jugadores[0].nombre}: ${jugadores[0].puntaje}</p>
            <p${currentPlayer === 1 ? ' class="current-player"' : ''}>${jugadores[1].nombre}: ${jugadores[1].puntaje}</p>
            <p${currentPlayer === 2 ? ' class="current-player"' : ''}>${jugadores[2].nombre}: ${jugadores[2].puntaje}</p>
              `;
            flippedCards = [];
          } else {
            setTimeout(() => {
              flippedCards.forEach((card) => card.classList.remove("flipped"));
              flippedCards = [];
              //segundo cambio
              currentPlayer = (currentPlayer + 1) % 3;
              document.getElementById("puntajes").innerHTML = `
            <p${currentPlayer === 0 ? ' class="current-player"' : ''}>${jugadores[0].nombre}: ${jugadores[0].puntaje}</p>
            <p${currentPlayer === 1 ? ' class="current-player"' : ''}>${jugadores[1].nombre}: ${jugadores[1].puntaje}</p>
            <p${currentPlayer === 2 ? ' class="current-player"' : ''}>${jugadores[2].nombre}: ${jugadores[2].puntaje}</p>
          `;
            }, 1000);
          }
        }

        if (flippedCards.length === 3) {
          const isSameValue =
            flippedCards[0].dataset.value === flippedCards[1].dataset.value &&
            flippedCards[1].dataset.value === flippedCards[2].dataset.value;

          if (isSameValue) {
            flippedCards.forEach((card) =>
              card.removeEventListener("click", flipCard)
            );
            flippedCards = [];
            jugadores.forEach((jugador) => {
              if (jugador.nombre === currentPlayer) {
                jugador.puntaje++;
                //tercer cambio
                document.getElementById("puntajes").innerHTML = `
                <p${currentPlayer === 0 ? ' class="current-player"' : ''}>${jugadores[0].nombre}: ${jugadores[0].puntaje}</p>
                <p${currentPlayer === 1 ? ' class="current-player"' : ''}>${jugadores[1].nombre}: ${jugadores[1].puntaje}</p>
                <p${currentPlayer === 2 ? ' class="current-player"' : ''}>${jugadores[2].nombre}: ${jugadores[2].puntaje}</p>
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
      });
    });
    let jugadores = [
      { nombre: "", puntaje: 0 },
      { nombre: "", puntaje: 0 },
      { nombre: "", puntaje: 0 },
    ];
    let currentPlayer = 0;
    let currentPlayerIndex = 0;
    let flippedCards = [];

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

    reset.addEventListener("click", function () {
      window.location.href = "index.html"; // redirige a la página principal
    });
  });
