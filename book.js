document.addEventListener("DOMContentLoaded", () => {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const dog = document.getElementById("dog");
  const text = document.getElementById("story");

  const story = [
    "Hey you 💗",
    "I’ve been thinking…",
    "And the universe kind of agrees.",
    "So I wanted to ask you…",
    "Will you be my Valentine? 🌷"
  ];

  let index = 0;

  function typeLine(line, done) {
    let i = 0;
    text.textContent = "";
    const t = setInterval(() => {
      text.textContent += line[i++];
      if (i === line.length) {
        clearInterval(t);
        if (done) setTimeout(done, 900);
      }
    }, 45);
  }

  function play() {
    if (index < story.length) {
      typeLine(story[index], () => {
        index++;
        play();
      });
    }
  }

  play();

  yes.addEventListener("click", () => {
    text.textContent = "You just made my universe brighter 💖";
    dog.classList.add("show");

    dog.style.bottom = "auto";
    dog.style.top = "120px";
    dog.style.left = "18%";

    setTimeout(() => {
      dog.style.top = "auto";
      dog.style.bottom = "40px";
      dog.style.left = "50%";
    }, 900);

    if (window.startCelebration) window.startCelebration();
  });

  no.addEventListener("mouseenter", () => {
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 140 - 70;
    no.style.transform =
      `translate(${x}px, ${y}px) rotate(${Math.random()*20-10}deg)`;

    if (window.spawnShootingStar) window.spawnShootingStar();
  });
});
