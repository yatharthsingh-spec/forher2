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
    s: 0.00005 + Math.random() * 0.00018,
    size: Math.random() * 1.8 + 0.4,
    tw: Math.random() * Math.PI * 2,
    hue: 260 + Math.random() * 60
  }));

  /* 🌙 MOON */
  const moon = {
    y: h + 180,
    radius: 95,
    speed: 0.06,
    x: () => w * 0.18
  };

  /* 🪐 PLANET */
  const planet = {
    angle: Math.random() * Math.PI * 2,
    orbit: 300,
    size: 44,
    speed: 0.0001,
    drift: 0
  };

  /* 🌠 SHOOTING STARS */
  const shooters = [];

  window.spawnShootingStar = () => {
    shooters.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.5,
      vx: 13,
      vy: 7,
      life: 60
    });
  };

  let celebration = false;
  window.startCelebration = () => celebration = true;

  function drawStars() {
    stars.forEach(star => {
      star.a += star.s * 16;
      star.tw += 0.02;

      star.r = star.baseR * (1 + Math.sin(star.tw) * 0.02);

      const x = w / 2 + Math.cos(star.a) * star.r;
      const y = h / 2 + Math.sin(star.a) * star.r;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${star.hue},90%,88%,${celebration ? 0.95 : 0.7})`;
      ctx.fill();
    });
  }

  function drawMoon() {
    if (moon.y > h - 220) moon.y -= moon.speed;

    const x = moon.x();
    const y = moon.y;

    const grad = ctx.createRadialGradient(
      x - 35, y - 35, 30,
      x, y, moon.radius
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#dcdcf5");

    ctx.beginPath();
    ctx.arc(x, y, moon.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 55;
    ctx.shadowColor = "rgba(220,220,255,0.6)";
    ctx.fill();
  }

  function drawPlanet() {
    planet.angle += planet.speed * 16;
    planet.drift += 0.004;

    const cx = w * 0.75;
    const cy = h * 0.28 + Math.sin(planet.drift) * 18;

    const x = cx + Math.cos(planet.angle) * planet.orbit;
    const y = cy + Math.sin(planet.angle) * planet.orbit;

    ctx.beginPath();
    ctx.arc(x, y, planet.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb7d5";
    ctx.shadowBlur = 35;
    ctx.shadowColor = "rgba(255,180,220,0.6)";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(
      x, y,
      planet.size * 2,
      planet.size * 0.7,
      0.6,
      0, Math.PI * 2
    );
    ctx.strokeStyle = "rgba(255,220,235,0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawShooters() {
    shooters.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.life--;

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - 40, s.y - 20);
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    while (shooters.length && shooters[0].life <= 0) shooters.shift();
  }

  function animate() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    drawStars();
    drawPlanet();
    drawMoon();
    drawShooters();

    requestAnimationFrame(animate);
  }

  animate();
});
