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

  /* 💗 SOFT ROMANTIC GLOWS */
  const glows = Array.from({ length: 140 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 50 + Math.random() * 70,
    a: Math.random() * Math.PI * 2,
    s: 0.00035 + Math.random() * 0.00035,
    o: 0.04 + Math.random() * 0.06
  }));

  function animate() {
    glows.forEach(g => {
      g.a += g.s * 16;

      const x = g.x + Math.cos(g.a) * 10;
      const y = g.y + Math.sin(g.a) * 10;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, g.r);
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
