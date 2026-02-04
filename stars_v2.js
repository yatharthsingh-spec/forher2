document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("space");
  const ctx = canvas.getContext("2d");

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  /* ✨ STARS */
  const stars = Array.from({ length: 700 }, () => ({
    r: Math.random() * Math.max(w, h),
    a: Math.random() * Math.PI * 2,
    s: 0.00012 + Math.random() * 0.00018,
    size: Math.random() * 1.6 + 0.4,
    hue: 300 + Math.random() * 40
  }));

  /* 💖 HEART RAIN */
  const hearts = [];

  function spawnHeart() {
    hearts.push({
      x: Math.random() * w,
      y: -20,
      size: 14 + Math.random() * 12,
      speed: 0.6 + Math.random() * 0.8,
      drift: Math.random() * 0.6 - 0.3
    });
  }

  setInterval(spawnHeart, 850);

  function animate() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    stars.forEach(s => {
      s.a += s.s * 16;
      const x = w / 2 + Math.cos(s.a) * s.r;
      const y = h / 2 + Math.sin(s.a) * s.r;
      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},80%,90%,0.8)`;
      ctx.fill();
    });

    hearts.forEach(hh => {
      hh.y += hh.speed;
      hh.x += hh.drift;
      ctx.font = `${hh.size}px serif`;
      ctx.fillText("💗", hh.x, hh.y);
    });

    while (hearts.length && hearts[0].y > h + 40) hearts.shift();

    requestAnimationFrame(animate);
  }

  animate();

  window.spawnShootingStar = () => {};
  window.startCelebration = () => {};
});
