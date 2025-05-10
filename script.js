const fechaInicio = new Date("2025-05-03T00:00:00");

function actualizarTiempo() {
  const ahora = new Date();
  const diff = ahora - fechaInicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("tiempo").textContent =
    `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
}

setInterval(actualizarTiempo, 1000);
actualizarTiempo();

function tocarMusica() {
  const audio = document.getElementById("musica");
  const mensaje = document.getElementById("sorpresa");

  audio.play();
  mensaje.style.display = "block";
}
