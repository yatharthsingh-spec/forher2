document.addEventListener("DOMContentLoaded", () => {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const dog = document.getElementById("dog");
  const text = document.getElementById("story");

  const lines = [
    "Hey you 💕",
    "Okay so… don’t panic.",
    "But you’re really special.",
    "And I was wondering…",
    "Will you be my Valentine? 🌷"
  ];

  let index = 0;

  function typeLine(line, callback) {
    let i = 0;
    text.textContent = "";
    const interval = setInterval(() => {
      text.textContent += line[i++];
      if (i === line.length) {
        clearInterval(interval);
        if (callback) setTimeout(callback, 900);
      }
    }, 45);
  }

  function playStory() {
    if (index < lines.length) {
      typeLine(lines[index], () => {
        index++;
        playStory();
      });
    }
  }

  playStory();

  yes.addEventListener("click", () => {
    text.textContent = "I KNEW IT 😭💖";
    dog.classList.add("show");

    // magical sky entry
    dog.style.bottom = "auto";
    dog.style.top = "120px";
    dog.style.left = "20%";

    setTimeout(() => {
      dog.style.top = "auto";
      dog.style.bottom = "40px";
      dog.style.left = "50%";
    }, 900);

    for (let i = 0; i < 10; i++) {
      if (window.spawnShootingStar) window.spawnShootingStar();
    }
  });

  no.addEventListener("mouseenter", () => {
    const x = Math.random() * 240 - 120;
    const y = Math.random() * 120 - 60;
    no.style.transform =
      `translate(${x}px, ${y}px) rotate(${Math.random()*20-10}deg)`;
  });
});

