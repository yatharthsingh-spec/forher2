document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("space");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  /* 🌸 SOFT GLOW PARTICLES */
  const glows = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 40 + Math.random() * 60,
    a: Math.random() * Math.PI * 2,
    s: 0.0004 + Math.random() * 0.0004,
    o: 0.05 + Math.random() * 0.08
  }));

  function animate() {
    glows.forEach(g => {
      g.a += g.s * 16;

      const x = g.x + Math.cos(g.a) * 12;
      const y = g.y + Math.sin(g.a) * 12;

      const grad = ctx.createRadialGradient(
        x, y, 0,
        x, y, g.r
      );
      grad.addColorStop(0, `rgba(255,180,220,${g.o})`);
      grad.addColorStop(1, "rgba(255,180,220,0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, g.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
