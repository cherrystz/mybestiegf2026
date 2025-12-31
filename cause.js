// Reasons database
const reasons = [
  {
    text: "ปีนี้ขอให้ได้อยู่กับเบ้บตลอดไปในทุกๆวันเลยนะคับ 💖",
    emoji: "🌟",
    gif: "gif1.gif",
  },
  {
    text: "ขอให้เบ้บเป็นตัวที่เบ้บอยากเป็น เป็นตัวตนของเบ้บเอง ไม่อยากให้คบกับพี่แล้วเหนื่อย เพราะพี่อยากให้เราได้อยู่ด้วยกันแบบสบายใจคับ 🌸 ",
    emoji: "💗",
    gif: "gif2.gif",
  },
  {
    text: "ฝึกงานก็ขอให้เจอสังคมดีๆ ทำแล้วไม่เหนื่อย มีความสุข เรื่องเรียนก็ให้พี่ช่วยได้ จะติจะว่าเค้าตอนเค้าทำผิดก็พูดได้เลย เพราะพี่อยากให้น้องบลูเป็นคนที่น่ารักและเก่งที่สุดเลยนะ ✨ ",
    emoji: "💕",
    gif: "gif1.gif",
  },
  {
    text: "อยากให้รักพี่มากๆเลยนะ เพราะพี่ก็รักน้องบลูมากๆเลยนะคะ 🦋 ",
    emoji: "🌟",
    gif: "gif2.gif",
  },
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById("reasons-container");
const shuffleButton = document.querySelector(".shuffle-button");
const reasonCounter = document.querySelector(".reason-counter");
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
  const card = document.createElement("div");
  card.className = "reason-card";

  const text = document.createElement("div");
  text.className = "reason-text";
  text.innerHTML = `${reason.emoji} ${reason.text}`;

  const gifOverlay = document.createElement("div");
  gifOverlay.className = "gif-overlay";
  gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Love Memory">`;

  card.appendChild(text);
  card.appendChild(gifOverlay);

  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "back.out",
  });

  return card;
}

// Display new reason
function displayNewReason() {
  if (isTransitioning) return;
  isTransitioning = true;

  if (currentReasonIndex < reasons.length) {
    const card = createReasonCard(reasons[currentReasonIndex]);
    reasonsContainer.appendChild(card);

    // Update counter
    reasonCounter.textContent = `Wishes ${currentReasonIndex + 1} of ${
      reasons.length
    }`;

    currentReasonIndex++;

    if (currentReasonIndex === 1) {
      shuffleButton.textContent = "ถัดไป 💕";
    }

    // Check if we should transform the button
    if (currentReasonIndex === reasons.length) {
      gsap.to(shuffleButton, {
        scale: 1.1,
        duration: 0.5,
        ease: "elastic.out",
        onComplete: () => {
          shuffleButton.textContent = "ไปหน้าสุดท้าย 💫";
          shuffleButton.classList.add("story-mode");
          shuffleButton.addEventListener("click", () => {
            gsap.to("body", {
              opacity: 0,
              duration: 1,
              onComplete: () => {
                window.location.href = "last.html"; // Replace with the actual URL of the next page
              },
            });
          });
        },
      });
    }

    // Create floating elements
    createFloatingElement();

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  } else {
    // Handle navigation to new page or section
    window.location.href = "#storylane";
    // Or trigger your next page functionality
  }
}

// Initialize button click
shuffleButton.addEventListener("click", () => {
  gsap.to(shuffleButton, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });
  displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
  const elements = ["🌸", "✨", "💖", "🦋", "⭐"];
  const element = document.createElement("div");
  element.className = "floating";
  element.textContent = elements[Math.floor(Math.random() * elements.length)];
  element.style.left = Math.random() * window.innerWidth + "px";
  element.style.top = Math.random() * window.innerHeight + "px";
  element.style.fontSize = Math.random() * 20 + 10 + "px";
  document.body.appendChild(element);

  gsap.to(element, {
    y: -500,
    duration: Math.random() * 10 + 10,
    opacity: 0,
    onComplete: () => element.remove(),
  });
}

// Custom cursor (same as before)
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - 15,
    y: e.clientY - 15,
    duration: 0.2,
  });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
