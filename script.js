const nombre = "🎂 Feliz Cumpleaños mi amor 🥳";

const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");

const noMessages = [
  "¿Segura? 🙁",
  "¿De verdad, no? 🥺",
  "¿Po qué no? 😟",
  "Eso duele un poquito 😟💔",
  "¿Segura que no quieres? 😢",
  "Me voy a poner tiste 🥺",
  "¿Y si mejor sí? 😔",
  "Pensé que dirías que sí 🥺",
  "No era la respuesta que esperaba 💔",
  "¿Ni por ser un día especial? 🥺",
  "Voy a fingir que no vi eso 😔",
  "Aún hay tiempo de cambiar de idea 🙁",
  "Eso no es una opción 🥺",
  "Po favo 😢"
];

let msgIndex = 0;

// Botón NO huye
noBtn.addEventListener("click", moveNo);

function moveNo() {
  const x = Math.random() * 90;
  const y = Math.random() * 90;

  noBtn.style.left = `${x}%`;
  noBtn.style.top = `${y}px`;

  noBtn.textContent = noMessages[msgIndex];
  msgIndex = (msgIndex + 1) % noMessages.length;
}

// Botón SÍ

function vibrateLove(style = "heartbeat") {
  if (!navigator.vibrate) return;

  const patterns = {
    soft: [25, 40, 25],
    heartbeat: [40, 60, 80, 60, 40],
    celebration: [50, 30, 50, 30, 100],
    long: [120]
  };

  navigator.vibrate(patterns[style] || patterns.heartbeat);
}

function openLetter() {
  createConfetti();
  if (navigator.vibrate) {
    vibrateLove("heartbeat");
  }

  const card = document.getElementById("card");

  card.innerHTML = `
    <div class="letter">
      <h1 class = "title">Una sorpresita para ti mi niña</br> ❤️ Jenny ❤️ </h1>
      <div class="name">${nombre}</div>
      </br>
      <p>
        Hoy celebro mucho más que tu cumpleaños, celebro que existas,
        que ilumines mis días y que hagas todo más bonito solo con tu sonrisa 🥰
      </p>

      <p>
        Gracias por ser tú, por tu ternura, y por cada momento que compartimos 💕
        No sabes lo feliz que me hace caminar a tu lado, amo cada cosita de ti, y amo, ser tu novio ❤️
      </p>

      <p>
        Deseo que cumplas muchísimos años más mi amor, y que me permitas vivirlos contigo,
        un vida llena de sueños cumplidos, abracitos infinitos, besitos lindos, de hermosos momentos
        que nos hagan sonreír juntos 😍 a tu ladito siempre, para apoyarte, celebrarte y amarte con todo mi corazón 🥰
      </p>

      <p>
        Que tengas un muy Feliz Cumpleaños mi niña hermosa ✨ que la pases muy bonito en este día tan especial para ti ❤️ te mando un besito muy lindo, un besito muy tierno, y un abracito con todo mi amor, con todo mi cariño, para ti, para el amor de mi vida 🥰
      </p>

      <p>
        Te quiero, te adoro, y te amo mucho mi amor, más de lo que mis palabras pueden expresar 💕
      </p>

    </div>
  `;
}

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let confettiParticles = [];
let confettiActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 160; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100,
      color: `hsl(${Math.random() * 360}, 80%, 65%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltSpeed: Math.random() * 0.07 + 0.05
    });
  }
  confettiActive = true;
  drawConfetti();
}

function drawConfetti() {
  if (!confettiActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x + p.tilt + p.r, p.y + p.r);
    ctx.stroke();
  });

  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confettiParticles.forEach(p => {
    p.tiltAngle += p.tiltSpeed;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}