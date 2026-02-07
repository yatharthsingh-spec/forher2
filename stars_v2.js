document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("space");
  const ctx = canvas.getContext("2d");

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    buildStaticLayer();
  }
  resize();
  window.addEventListener("resize", resize);

  /* -------------------------
     STATIC LAYER (ONCE)
  -------------------------- */
  const staticCanvas = document.createElement("canvas");
  const sctx = staticCanvas.getContext("2d");

  function buildStaticLayer() {
    staticCanvas.width = w;
    staticCanvas.height = h;

    // background
    sctx.fillStyle = "#050510";
    sctx.fillRect(0, 0, w, h);

    /* ✨ STARS */
    for (let i = 0; i < 500; i++) {
      const r = Math.random() * Math.max(w, h);
      const a = Math.random() * Math.PI * 2;
      const x = w / 2 + Math.cos(a) * r;
      const y = h / 2 + Math.sin(a) * r;

      sctx.beginPath();
      sctx.arc(x, y, Math.random() * 1.4 + 0.4, 0, Math.PI * 2);
      sctx.fillStyle = `hsla(${260 + Math.random() * 50},85%,88%,0.75)`;
      sctx.fill();
    }

    /* ☁️ PLUSH CLOUDS */
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h * 0.6;
      const r = 260 + Math.random() * 160;

      const g = sctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,190,220,0.06)");
      g.addColorStop(1, "rgba(255,190,220,0)");

      sctx.beginPath();
      sctx.arc(x, y, r, 0, Math.PI * 2);
      sctx.fillStyle = g;
      sctx.fill();
    }
  }

  buildStaticLayer();

  /* -------------------------
     DYNAMIC LAYER
  -------------------------- */

  const hearts = [];
  const MAX_HEARTS = 100;
  let celebrate = false;

  window.startCelebration = () => {
    celebrate = true;
    for (let i = 0; i < 50; i++) {
      hearts.push({
        x: w / 2,
        y: h / 2,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 160,
        size: 2 + Math.random() * 2
      });
    }
  };

  /* -------------------------
     CONTROLLED RENDER LOOP
  -------------------------- */
  let last = 0;
  const FPS = 40;
  const interval = 1000 / FPS;

  function animate(time) {
    if (time - last < interval) {
      requestAnimationFrame(animate);
      return;
    }
    last = time;

    // draw static background
    ctx.drawImage(staticCanvas, 0, 0);

    // hearts
    hearts.forEach(hh => {
      hh.x += hh.vx;
      hh.y += hh.vy;
      hh.life--;

      ctx.beginPath();
      ctx.arc(hh.x, hh.y, hh.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,170,210,0.9)";
      ctx.fill();
    });

    while (hearts.length && hearts[0].life <= 0) hearts.shift();

    // gentle heart rain
    if (celebrate && Math.random() < 0.08 && hearts.length < MAX_HEARTS) {
      hearts.push({
        x: Math.random() * w,
        y: -10,
        vx: Math.random() - 0.5,
        vy: 0.8 + Math.random(),
        life: 200,
        size: 2 + Math.random() * 2
      });
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
