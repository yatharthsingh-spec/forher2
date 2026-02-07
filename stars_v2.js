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

  /* ⭐ STARS (OPTIMIZED) */
  const stars = Array.from({ length: 600 }, () => ({
    r: Math.random() * Math.max(w, h),
    a: Math.random() * Math.PI * 2,
    s: 0.00008 + Math.random() * 0.00012,
    size: Math.random() * 1.4 + 0.4,
    hue: 260 + Math.random() * 50
  }));

  /* ☁️ CLOUDS (LOW FPS UPDATE) */
  const clouds = Array.from({ length: 4 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.6,
    r: 220 + Math.random() * 140,
    dx: 0.04 + Math.random() * 0.06,
    o: 0.06
  }));

  /* 💖 HEART PARTICLES (CAPPED) */
  const hearts = [];
  const MAX_HEARTS = 120;

  function spawnHeart(x, y, burst = false) {
    if (hearts.length > MAX_HEARTS) return;

    hearts.push({
      x,
      y,
      vx: burst ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5),
      vy: burst ? (Math.random() - 0.5) * 4 : 0.8 + Math.random(),
      life: 180,
      size: 2.5 + Math.random() * 2
    });
  }

  let celebrate = false;
  let frame = 0;

  window.startCelebration = () => {
    celebrate = true;
    for (let i = 0; i < 60; i++) spawnHeart(w / 2, h / 2, true);
  };

  function drawStars() {
    stars.forEach(s => {
      s.a += s.s * 16;
      const x = w / 2 + Math.cos(s.a) * s.r;
      const y = h / 2 + Math.sin(s.a) * s.r;

      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},85%,88%,${celebrate ? 0.95 : 0.7})`;
      ctx.fill();
    });
  }

  function drawClouds() {
    clouds.forEach(c => {
      c.x += c.dx;
      if (c.x - c.r > w) c.x = -c.r;

      const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
      g.addColorStop(0, `rgba(255,190,220,${c.o})`);
      g.addColorStop(1, "rgba(255,190,220,0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawHearts() {
    hearts.forEach(hh => {
      hh.x += hh.vx;
      hh.y += hh.vy;
      hh.life--;

      ctx.beginPath();
      ctx.arc(hh.x, hh.y, hh.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,170,210,0.85)";
      ctx.fill();
    });

    while (hearts.length && hearts[0].life <= 0) hearts.shift();
  }

  function animate() {
    frame++;

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    drawStars();

    // clouds every 2nd frame (BIG perf win)
    if (frame % 2 === 0) drawClouds();

    drawHearts();

    // gentle heart rain during celebration
    if (celebrate && frame % 10 === 0) {
      spawnHeart(Math.random() * w, -10);
    }

    requestAnimationFrame(animate);
  }

  animate();
});
