// Datos de ejemplo para el top 10
  // Función para mostrar el top 10 en la página
  function showScores() {
    const scoreList = document.getElementById("score-list");
  
    // Limpiar la lista
    scoreList.innerHTML = "";
  
    // Mostrar los primeros 10 puntajes
    for (let i = 0; i < 10 && i < scores.length; i++) {
      const score = scores[i];
      const listItem = document.createElement("li");
      listItem.innerText = `${score.name}: ${score.score}`;
      scoreList.appendChild(listItem);
    }
  }
  const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});
  // Llamar a la función para mostrar los puntajes al cargar la página
  showScores();