// --- LÓGICA DE LA PANTALLA DE CARGA Y CUENTA REGRESIVA ---
window.addEventListener("load", () => {
  const preCarga = document.getElementById('pre-carga');
  const mainContent = document.getElementById('main-content');
  const countdownDisplay = document.getElementById('countdown');

  // MODO DE PRUEBA: Usa una fecha del pasado para que se desbloquee al instante.
  const fechaDesbloqueo = new Date(2025, 5, 24, 0, 0, 0, 0); // 27 de junio de 2025 a

  // MODO FINAL: ¡Usa esta línea antes de enviárselo a Jhomara!
  // const fechaDesbloqueo = new Date(2025, 5, 23, 21, 19, 0);

  const countdownInterval = setInterval(() => {
    const ahora = new Date();
    const diferencia = fechaDesbloqueo - ahora;

    if (diferencia < 0) {
      clearInterval(countdownInterval);
      preCarga.classList.add('fade-out');

      setTimeout(() => {
        preCarga.style.display = 'none';
        mainContent.classList.remove('hidden');

        // Inicia las funciones principales de la página
        crearEstrellas(50); // Crea el fondo estrellado
      }, 1500);

      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    countdownDisplay.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }, 1000);
});

// --- VARIABLES GLOBALES DEL JUEGO ---
let juegoActual = 1;
const TOTAL_JUEGOS = 10;
let timeoutMensaje;
let indexMedia = 0;

const contadoresDeIntentos = { 2: 0, 7: 0, 8: 0 };

const media = [
  { type: 'image', src: 'img/img1.jpg' },
  { type: 'video', src: 'img/vid3.mp4' },
  { type: 'image', src: 'img/img2.jpg' },
  { type: 'video', src: 'img/vid2.mp4' },
  { type: 'image', src: 'img/img3.jpg' },
  { type: 'video', src: 'img/vid1.mp4' },
  { type: 'image', src: 'img/img4.jpg' },
  { type: 'video', src: 'img/vid4.mp4' },
  { type: 'image', src: 'img/img5.jpg' },
  { type: 'image', src: 'img/img6.jpg' },
  { type: 'image', src: 'img/img7.jpg' },
  { type: 'image', src: 'img/img9.jpg' },
  { type: 'image', src: 'img/img10.jpg' },
  { type: 'image', src: 'img/img11.jpg' },
  { type: 'video', src: 'img/vid5.mp4' }, 
];

// --- FUNCIONES DEL JUEGO Y LA INTERFAZ ---
function normalizarTexto(texto) { return texto.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, '').trim(); }

function mostrarMensaje(mensaje) {
  const msg = document.getElementById("mensajeFlotante");
  msg.textContent = mensaje;
  msg.classList.remove("hidden");
  clearTimeout(timeoutMensaje);
  timeoutMensaje = setTimeout(() => msg.classList.add("hidden"), 4000);
}

function empezarJuego() {
  document.getElementById("juegos").classList.remove("hidden");
  document.getElementById("btnEmpezar").classList.add("hidden");
  mostrarJuego(juegoActual);
}

function mostrarJuego(num) {
  document.querySelectorAll(".juego").forEach(div => div.classList.remove("active"));

  setTimeout(() => {
    document.querySelectorAll(".juego").forEach((div, i) => div.classList.toggle("hidden", i + 1 !== num));
    const juegoAMostrar = document.getElementById(`juego${num}`);
    if (juegoAMostrar) {
      juegoAMostrar.classList.add("active");
      const inputActual = juegoAMostrar.querySelector('input');
      if (inputActual) inputActual.focus();
    }
  }, 300);
}

function avanzar() {
  if (juegoActual < TOTAL_JUEGOS) {
    juegoActual++;
    mostrarJuego(juegoActual);
  }
}

// --- LÓGICA DE VERIFICACIÓN (TU FUNCIÓN INTEGRADA) ---
function verificarResp(num) {
  const input = document.getElementById(`resp${num}`);
  const resp = normalizarTexto(input.value);
  const respuestasCorrectas = {
    1: ["xiomara"], 2: ["parque juana alarco de dammert"], 4: ["la piedrita", "una piedrita", "una piedra"],
    5: ["saga falabella"], 6: ["la excusa perfecta"], 7: ["si"], 8: ["si"],
  };

  if (resp === "") { mostrarMensaje("No dejes la respuesta en blanco, amor 🥺"); return; }

  if (num === 3) {
    if (resp.includes("1")) mostrarMensaje("¡Buena elección! Sabía que no te resistes a lo dulce 🍰");
    else if (resp.includes("2")) mostrarMensaje("Jajaja, te entiendo... dormir es sagrado 😴");
    else mostrarMensaje("¡Esa es una respuesta creativa! Me gusta 😉");
    avanzar();
    return;
  }

  if (num === 9) {
    const colorCapitalizado = resp.charAt(0).toUpperCase() + resp.slice(1);
    mostrarMensaje(`${colorCapitalizado}... ¡Seguro te queda hermoso ese color! 😍`);
    avanzar();
    return;
  }

  if (respuestasCorrectas[num] && respuestasCorrectas[num].includes(resp)) {
    mostrarMensaje("¡Correcto! Sabía que te acordarías 🎉");
    if (contadoresDeIntentos.hasOwnProperty(num)) contadoresDeIntentos[num] = 0;
    avanzar();
  } else {
    if (contadoresDeIntentos.hasOwnProperty(num)) contadoresDeIntentos[num]++;
    if (num === 2) {
      const intentos = contadoresDeIntentos[2];
      if (intentos === 1) mostrarMensaje("Pista 1: Está al lado del Real Real Plaza Centro Cívico 😉");
      else if (intentos === 2) mostrarMensaje("Pista 2: Revisa tu Google Maps... la memoria es frágil 🗺️");
      else mostrarMensaje("Última pista: ¡Es el nombre completo del parque! Tú puedes.");
    } else if (num === 7 || num === 8) {
      const intentos = contadoresDeIntentos[num];
      if (intentos === 1) mostrarMensaje("¿En serio?? 🤔 ¿Estás segura?");
      else if (intentos === 2) mostrarMensaje("Jajaja, yo sé que sí... Anda, dime que sí 😉");
      else if (intentos === 3) mostrarMensaje("Yo sé que tienes una pequeña pizca... ¡y así te amo! 😜");
      else mostrarMensaje("Bueno, bueno... la respuesta correcta es 'sí' para poder avanzar. 😘");
    } else {
      mostrarMensaje("Respuesta incorrecta, inténtalo de nuevo 💭");
    }
  }
}

// --- FUNCIONES DE LA CARTA FINAL ---
function finalizarJuego() {
  const mensaje = document.getElementById("resp10").value.trim();
  if (mensaje.length < 10) { mostrarMensaje("Pide un deseo más largo, el universo escucha 🌠"); return; }

  localStorage.setItem("mensajeFinal", mensaje);
  document.getElementById("juegos").classList.add("hidden");
  const cartaSection = document.getElementById("carta");
  cartaSection.classList.remove("hidden");
  cartaSection.classList.add("active");

  actualizarContador();
  setInterval(actualizarContador, 1000);
  mostrarMedia();
  document.getElementById("audio").play().catch(() => { });
  lanzarEstrellasFugaces(5);

  const cartaTexto = `Feliz dia Jhoma 💕 

Hoy es tu día, hoy cumples 23 añitos, ya estas vieja...JAJAJAJJAJJAJA ya se llegan cambios pero no de altura.

Pero hoy no hay responsabilidades, ni preocupaciones, ni cargas del pasado. Hoy solo importas tú, tu sonrisa y las personas que te rodean con cariño. Hoy mereces olvidarte de todo lo que pesa y simplemente disfrutar, reír, vivir. Que lo pases increíble, de verdad.

Quiero aprovechar esta ocasión para decirte algo desde el corazón, con toda la sinceridad que a veces cuesta expresar cara a cara. Sé que nuestro momento ha llegado a su fin, y aunque duele aceptarlo, no puedo evitar agradecerte por todo lo que fuiste en mi vida.

Siempre vi en ti a una mujer maravillosa, fuerte, divertida, increíble… y, sobre todo, valiente. Porque incluso con tus miedos, seguías avanzando. Tal vez pienses que, cuando tomamos esa decisión, yo fui inmaduro o que dejé todo atrás sin luchar, pero no sabes cuánto me afectó. No fue fácil. No fue porque dejé de verte en mi futuro, sino porque a veces simplemente no supimos encontrarnos a mitad de camino.

Me di cuenta que tienes miedo de amar, de entregarte por completo. Lo entendí con el tiempo, al ver cómo levantabas barreras, cómo te protegías. Y sí, eso me afectó, me hizo dudar, me hizo sentir inseguro. Yo solo necesitaba que me dijeras: "Lo vamos a resolver juntos".

Quiero pedirte algo, no por mí, sino por ti: no te aferres al pasado. Suelta lo que te duele, incluso si eso me incluye. A veces hay que tener el coraje de cortar con lo que ya no nos construye. Lo digo con respeto, con cariño… porque sé que mereces vivir libre de esas cadenas invisibles.

Aun así, no me arrepiento de nada. Todo valió la pena. Me hiciste feliz, incluso con tus enojos, tus bromas, tus celos. No te escribiré una carta cliché, porque sabes que nunca fui así. Tal vez leas esto o tal vez no, pero quiero que sepas que gracias... de corazón.

Gracias por dejarme caminar a tu lado, aunque haya sido por poco tiempo. Por permitirme conocerte, por compartir tus miedos, tus locuras, tus sueños… y dejarme ser parte de tu mundo, aunque fuera solo un capítulo.

Sé que un día llegará alguien mejor que yo, alguien que sepa amarte como mereces, y espero que tengas los ojos y el corazón abiertos para verlo. Yo me quedaré con los recuerdos, con lo bonito que vivimos. Solo te pido una cosa: no me busques, déjame abrazar mi soledad a mi manera.

Te extraño, sí. Pero más que eso, deseo que seas feliz, a tu forma, a tu ritmo y con tus locuras.

Gracias por ser tú, por confiar en mí, por reír conmigo. Que hoy sea un día inolvidable, porque tú lo eres.

Feliz cumpleaños, Jhomara.

Con cariño,
Jean Custodio

P.D. Tu deseo fue:"${mensaje}"`;

  mostrarCartaConTyping(cartaTexto);
}

// --- FUNCIONES AUXILIARES DE ANIMACIÓN Y CARTA ---
function crearEstrellas(cantidad) {
  const container = document.getElementById('star-background');
  if (!container) return;
  for (let i = 0; i < cantidad; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`; star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`; star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(star);
  }
}

function lanzarEstrellasFugaces(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100 - 50}%`;
    star.style.animationDelay = `${i * 1.5}s`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 6000);
  }
}

function actualizarContador() {
  const inicio = new Date("2025-05-03T09:50:00");
  const ahora = new Date();
  const contadorDisplay = document.getElementById("tiempoContador");
  if (!contadorDisplay) return;

  if (ahora < inicio) {
    contadorDisplay.innerHTML = "Nuestra constelación comenzará a brillar el 3 de mayo ❤️";
  } else {
    const dif = ahora - inicio;
    const dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    const horas = Math.floor((dif / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((dif / (1000 * 60)) % 60);
    const segundos = Math.floor((dif / 1000) % 60);
    contadorDisplay.innerHTML = `Nuestra galaxia personal:<br>${dias} días, ${horas}h, ${minutos}m y ${segundos}s juntos`;
  }
}

function mostrarMedia() {
  const container = document.getElementById("mediaContainer");
  if (!container || !media.length) return;
  container.innerHTML = "";
  const item = media[indexMedia];

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src; img.alt = "Foto del recuerdo";
    container.appendChild(img);
  } else if (item.type === "video") {
    const video = document.createElement("video");
    video.src = item.src; video.controls = true; video.autoplay = true;
    video.muted = true; video.loop = true;
    container.appendChild(video);
  }
}

function cambiarMedia(dir) {
  if (!media.length) return;
  indexMedia = (indexMedia + dir + media.length) % media.length;
  mostrarMedia();
}

function mostrarCartaConTyping(texto) {
  const div = document.getElementById("textoCarta");
  if (!div) return;
  div.textContent = "";
  let i = 0;
  const intervalo = setInterval(() => {
    if (i < texto.length) {
      div.textContent += texto.charAt(i);
      i++;
    } else {
      clearInterval(intervalo);
    }
  }, 40);
}

// --- EVENT LISTENERS ---
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("carta").classList.contains("hidden")) {
    if (e.key === "ArrowRight") cambiarMedia(1);
    if (e.key === "ArrowLeft") cambiarMedia(-1);
  } else if (!document.getElementById("juegos").classList.contains("hidden")) {
    if (e.key === "Enter") {
      const botonVisible = document.querySelector(`.juego:not(.hidden) .btn`);
      if (botonVisible) botonVisible.click();
    }
  }
});
