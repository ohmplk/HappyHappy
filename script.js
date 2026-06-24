const images = [
    "img/rose1.webp",
    "img/rose2.webp",
    "img/rose3.webp",
    "img/valentine.webp"
];
const openSound = document.getElementById("openSound");
const box = document.getElementById("box");
const textEl = document.getElementById("valentine-text");

const message = "Happy Valentine Day Na 💖";

let opened = false;
let roseInterval = null;

const bgm = document.getElementById("bgm");

box.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    bgm.volume = 0.25;
    bgm.play();

    openSound.currentTime = 0;
    openSound.play();

    box.classList.add("open");

    // เริ่มพิมพ์ข้อความ
    setTimeout(typeText, 600);

    // ปล่อยรูปออกมาเรื่อย ๆ
    roseInterval = setInterval(createRose, 150);
});

function createRose() {
    const rose = document.createElement("img");

    const randomImage = images[Math.floor(Math.random() * images.length)];
    rose.src = randomImage;
    rose.className = "rose";

    const size = Math.random() * 60 + 60;
    rose.style.width = size + "px";

    const boxRect = box.getBoundingClientRect();



    const startX =
        boxRect.left + boxRect.width / 3 + (Math.random() * 30 - 15);
    const startY =
        boxRect.top + 5 + (Math.random() * 20 - 10);

    rose.style.left = startX + "px";
    rose.style.top = startY + "px";

    document.body.appendChild(rose);

    const margin = 40;
    const endX = margin + Math.random() * (window.innerWidth - margin * 2);
    const endY = margin + Math.random() * (window.innerHeight - margin * 2);




    requestAnimationFrame(() => {
        rose.style.transform = `
      translate(${endX - startX}px, ${endY - startY}px)
      rotate(${Math.random() * 360}deg)
      scale(1.2)
    `;
        rose.style.opacity = 0;
    });

    setTimeout(() => rose.remove(), 4000);
}
const typeSound = document.getElementById("typeSound");

function typeText() {
  textEl.textContent = "";
  textEl.classList.add("show");

  // เล่นเสียงครั้งเดียว
  typeSound.currentTime = 0;
  typeSound.loop = true;
  typeSound.volume = 0.4;
  typeSound.play();

  let i = 0;
  const typing = setInterval(() => {
    textEl.textContent += message[i];
    i++;

    if (i >= message.length) {
      clearInterval(typing);
      typeSound.pause(); // หยุดเสียง
      typeSound.currentTime = 0;
    }
  }, 120);
}

