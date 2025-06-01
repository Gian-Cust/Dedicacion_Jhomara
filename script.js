// script.js

// ----- CONFIGURACIÓN DE FECHAS -----
// FECHA DE DESBLOQUEO DE LA PÁGINA (Año, Mes (0-11), Día, Hora, Minuto, Segundo)
// Para el 3 de Junio a las 00:00 horas
const FECHA_DESBLOQUEO = new Date(2025, 5, 3, 21, 49, 00); // Mes 5 es Junio (0=Enero, 1=Febrero, ..., 5=Junio)
// ¡¡¡ AJUSTA EL AÑO SI ES NECESARIO (ej. si es para 2025, pon 2025) !!!

// FECHA DE INICIO DE LA RELACIÓN (para el contador de "Un mes de amor")
// Formato: AÑO-MES-DÍA T HORA:MINUTO:SEGUNDO (Mes 1-12)
// La que tenías: 3 de Mayo de 2025 a las 9:49 PM
const FECHA_INICIO_RELACION = new Date("2025-05-03T21:49:00"); 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!  IMPORTANTE: REVISA QUE ESTA FECHA DE INICIO RELACIÓN   !!!
// !!!  SEA LA CORRECTA PARA EL CONTADOR DEL "MES JUNTOS"      !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// ----- ELEMENTOS DEL DOM -----
const preCargaScreen = document.getElementById("pre-carga");
const cuentaRegresivaElement = document.getElementById("cuenta-regresiva");
const bienvenidaScreen = document.getElementById("bienvenida");
const contenidoPrincipal = document.getElementById("contenido");

const tiempoElement = document.getElementById("tiempo");
const audio = document.getElementById("musica");
const mensajeSorpresa = document.getElementById("sorpresa");
const flyingHeartsContainer = document.getElementById("flyingHeartsContainer");
const slides = document.querySelectorAll(".slide");
const botonEntrar = document.querySelector('#bienvenida button');
const musicHeart = document.querySelector('.heart');

let slideIndex = 0;
let intervaloCuentaRegresiva;

// ----- LÓGICA DE PRE-CARGA Y DESBLOQUEO -----
function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferencia = FECHA_DESBLOQUEO - ahora;

    if (diferencia <= 0) {
        clearInterval(intervaloCuentaRegresiva);
        if (cuentaRegresivaElement) cuentaRegresivaElement.textContent = "¡La sorpresa está lista!";
        mostrarBienvenida();
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    if (cuentaRegresivaElement) {
        cuentaRegresivaElement.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }
}

function mostrarBienvenida() {
    if (preCargaScreen) {
        preCargaScreen.classList.add("fade-out"); // Opcional: animación de salida
        setTimeout(() => {
            preCargaScreen.classList.add("oculto");
            preCargaScreen.style.display = 'none'; // Asegurar que no ocupe espacio
        }, 800); // Sincronizar con la animación de fade-out en CSS
    }
    if (bienvenidaScreen) {
        bienvenidaScreen.classList.remove("oculto");
         // Para que la animación de entrada de bienvenida funcione si la tienes
        bienvenidaScreen.style.opacity = "0";
        setTimeout(() => {  bienvenidaScreen.style.opacity = "1"; }, 50);
    }
}

function iniciarChequeoDesbloqueo() {
    const ahora = new Date();
    if (ahora >= FECHA_DESBLOQUEO) {
        mostrarBienvenida();
    } else {
        if (preCargaScreen) preCargaScreen.classList.remove("oculto"); // Asegurar que pre-carga esté visible
        if (bienvenidaScreen) bienvenidaScreen.classList.add("oculto");
        if (contenidoPrincipal) contenidoPrincipal.classList.add("oculto");
        actualizarCuentaRegresiva(); // Llamada inicial
        intervaloCuentaRegresiva = setInterval(actualizarCuentaRegresiva, 1000);
    }
}

// ----- LÓGICA DEL SITIO PRINCIPAL (después de pre-carga) -----
function actualizarTiempoRelacion() {
  const ahora = new Date();
  let diff = ahora - FECHA_INICIO_RELACION;

  if (diff < 0) {
    if (tiempoElement) tiempoElement.textContent = "¡La magia de nuestro tiempo está por comenzar!";
    return;
  }

  const unMesEnMs = 30.44 * 24 * 60 * 60 * 1000; 

  const meses = Math.floor(diff / unMesEnMs);
  let diffRestante = diff % unMesEnMs; 

  const dias = Math.floor(diffRestante / (1000 * 60 * 60 * 24));
  diffRestante %= (1000 * 60 * 60 * 24);

  const horas = Math.floor(diffRestante / (1000 * 60 * 60));
  diffRestante %= (1000 * 60 * 60);

  const minutos = Math.floor(diffRestante / (1000 * 60));
  diffRestante %= (1000 * 60);
  
  const segundos = Math.floor(diffRestante / 1000);

  let tiempoTexto = "";
  if (meses > 0) tiempoTexto += `${meses} mes${meses !== 1 ? 'es' : ''}, `;
  tiempoTexto += `${dias} día${dias !== 1 ? 's' : ''}, ${horas} hora${horas !== 1 ? 's' : ''}, ${minutos} minuto${minutos !== 1 ? 's' : ''}, ${segundos} segundo${segundos !== 1 ? 's' : ''}`;
  
  if (tiempoElement) tiempoElement.textContent = tiempoTexto;
}

function tocarMusica() {
  const audio = document.getElementById("musica");
  const mensaje = document.getElementById("sorpresa");

  audio.play();
  mensaje.style.display = "block";
}

function mostrarSiguienteSlide() {
  if (slides.length === 0) return;
  slides[slideIndex].classList.remove("activo");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("activo");
}

function entrarSitio() {
  if (bienvenidaScreen) {
    bienvenidaScreen.classList.add("fade-out");
  }

  if (flyingHeartsContainer) {
    for (let i = 0; i < 20; i++) {
      crearCorazonVolador();
    }
  }
  
  setTimeout(() => {
    if (bienvenidaScreen) {
        bienvenidaScreen.classList.add("oculto");
        bienvenidaScreen.style.display = 'none';
    }
    if (contenidoPrincipal) {
        contenidoPrincipal.classList.remove("oculto");
        // Activar animaciones de entrada del contenido si las tienes
        contenidoPrincipal.style.opacity = "0";
        setTimeout(() => {  contenidoPrincipal.style.opacity = "1"; }, 50);
    }
    // Inicializar contador de relación y carrusel una vez que el contenido es visible
    if (tiempoElement) {
        setInterval(actualizarTiempoRelacion, 1000);
        actualizarTiempoRelacion(); // Llamada inicial
    }
    if (slides.length > 0) {
        slides[0].classList.add('activo'); // Asegurar que la primera imagen se muestre
        setInterval(mostrarSiguienteSlide, 4000);
    }

  }, 800); 
}

function crearCorazonVolador() {
    if (!flyingHeartsContainer) return; 
    const heart = document.createElement('div');
    heart.classList.add('flying-heart');
    heart.innerHTML = '❤'; 
    heart.style.left = Math.random() * 100 + 'vw'; 
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; 
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px'; 
    heart.style.animationDelay = (Math.random() * 2) + 's'; 
    
    flyingHeartsContainer.appendChild(heart);

    setTimeout(() => {
        if (heart && heart.parentNode) { // Verificar que el corazón aún exista y tenga un padre
            heart.remove();
        }
    }, (parseFloat(heart.style.animationDuration) * 1000) + (parseFloat(heart.style.animationDelay || 0) * 1000) + 200); // Pequeño buffer
}

// ----- INICIALIZACIÓN Y EVENT LISTENERS -----

// Iniciar chequeo de desbloqueo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    iniciarChequeoDesbloqueo();

    if (botonEntrar) {
        botonEntrar.addEventListener('click', entrarSitio);
    }

    if (musicHeart) {
        musicHeart.addEventListener('click', tocarMusica);
    }
});

// La carga de imágenes y otros recursos pesados se maneja con 'load'
window.addEventListener('load', () => {
    // Si la página ya se desbloqueó y el contenido principal está visible,
    // nos aseguramos de que el carrusel inicie correctamente.
    if (contenidoPrincipal && !contenidoPrincipal.classList.contains('oculto')) {
        if (slides.length > 0 && !slides[slideIndex].classList.contains('activo')) {
            slides[0].classList.add('activo');
        }
        if (tiempoElement) {
            actualizarTiempoRelacion(); // Actualizar una vez cargado por si acaso
        }
    }
});
