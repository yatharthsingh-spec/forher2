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

  /* ⭐ ROTATING STARS */
  const stars = Array.from({ length: 900 }, () => ({
    baseR: Math.random() * Math.max(w, h),
    r: 0,
    a: Math.random() * Math.PI * 2,
    s: 0.00005 + Math.random() * 0.00015,
    size: Math.random() * 1.6 + 0.4,
    tw: Math.random() * Math.PI * 2,
    hue: 260 + Math.random() * 60
  }));

  /* ☁️ PLUSH CLOUDS */
  const clouds = Array.from({ length: 6 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.6,
    r: 180 + Math.random() * 120,
    dx: 0.06 + Math.random() * 0.1,
    o: 0.05 + Math.random() * 0.06
  }));

  /* 🌙 MOON */
  const moon = {
    y: h + 160,
    r: 90,
    speed: 0.05,
    x: () => w * 0.18
  };

  /* 🪐 PLANET */
  const planet = {
    a: Math.random() * Math.PI * 2,
    orbit: 280,
    size: 42,
    speed: 0.0001
  };

  /* 🌠 SHOOTING STARS */
  const shooters = [];
  window.spawnShootingStar = () => {
    shooters.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.4,
      vx: 12,
      vy: 6,
      life: 60
    });
  };

  /* 💖 CELEBRATION STATE */
  let celebrate = false;
  let pulse = 0;

  /* 💖 HEART CONFETTI */
  const hearts = [];

  function heartBurst() {
    for (let i = 0; i < 140; i++) {
      const a = Math.random() * Math.PI * 2;
      hearts.push({
        x: w / 2,
        y: h / 2,
        vx: Math.cos(a) * (2 + Math.random() * 4),
        vy: Math.sin(a) * (2 + Math.random() * 4),
        life: 120,
        size: 12 + Math.random() * 10
      });
    }
  }

  function rainHeart() {
    hearts.push({
      x: Math.random() * w,
      y: -20,
      vx: Math.random() * 0.6 - 0.3,
      vy: 0.8 + Math.random() * 1.2,
      life: 260,
      size: 10 + Math.random() * 8
    });
  }

  /* 💗 HEART CONSTELLATION */
  const heartPoints = Array.from({ length: 60 }, (_, i) => {
    const t = (i / 60) * Math.PI * 2;
    return {
      x: 16 * Math.pow(Math.sin(t), 3),
      y:
        -(13 * Math.cos(t)
          - 5 * Math.cos(2 * t)
          - 2 * Math.cos(3 * t)
          - Math.cos(4 * t))
    };
  });

  window.startCelebration = () => {
    if (celebrate) return;
    celebrate = true;
    heartBurst();
    setInterval(rainHeart, 140);
  };

  /* 🎨 DRAW FUNCTIONS */

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

  function drawStars() {
    pulse += celebrate ? 0.04 : 0.01;

    stars.forEach(s => {
      s.a += s.s * 16;
      s.tw += 0.02;
      s.r = s.baseR * (1 + Math.sin(s.tw) * 0.02);

      const x = w / 2 + Math.cos(s.a) * s.r;
      const y = h / 2 + Math.sin(s.a) * s.r;

      const glow = celebrate
        ? 0.85 + Math.sin(pulse) * 0.2
        : 0.7;

      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},90%,88%,${glow})`;
      ctx.fill();
    });
  }

  function drawHeartConstellation() {
    if (!celebrate) return;

    const scale = 6 + Math.sin(pulse) * 0.4;
    const cx = w * 0.5;
    const cy = h * 0.45;

    heartPoints.forEach(p => {
      ctx.beginPath();
      ctx.arc(
        cx + p.x * scale,
        cy + p.y * scale,
        1.8,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255,180,220,0.9)";
      ctx.fill();
    });
  }

  function drawHearts() {
    hearts.forEach(hh => {
      hh.x += hh.vx;
      hh.y += hh.vy;
      hh.life--;

      ctx.font = `${hh.size}px serif`;
      ctx.fillText("💖", hh.x, hh.y);
    });

    while (hearts.length && hearts[0].life <= 0) hearts.shift();
  }

  function drawMoonPlanet() {
    if (moon.y > h - 220) moon.y -= moon.speed;

    ctx.beginPath();
    ctx.arc(moon.x(), moon.y, moon.r, 0, Math.PI * 2);
    ctx.fillStyle = "#f2f2ff";
    ctx.shadowBlur = 45;
    ctx.shadowColor = "rgba(220,220,255,0.6)";
    ctx.fill();

    planet.a += planet.speed * 16;
    ctx.beginPath();
    ctx.arc(
      w * 0.75 + Math.cos(planet.a) * planet.orbit,
      h * 0.3 + Math.sin(planet.a) * planet.orbit,
      planet.size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#ffb7d5";
    ctx.fill();
  }

  function drawShooters() {
    shooters.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.life--;

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - 36, s.y - 18);
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.stroke();
    });

    while (shooters.length && shooters[0].life <= 0) shooters.shift();
  }

  function animate() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    drawClouds();
    drawStars();
    drawHeartConstellation();
    drawMoonPlanet();
    drawHearts();
    drawShooters();

    requestAnimationFrame(animate);
  }

  animate();
});
