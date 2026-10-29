/* A browser sketch in the manner of the Endless engine, seeded from a string.
   Prototype only: the real artwork is made by the Genesis engine. Colours come from tokens.css. */
(function () {
  function hash(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function token(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function draw(canvas, seed, opts) {
    opts = opts || {};
    var css = canvas.getBoundingClientRect().width || 560;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var S = Math.round(css * dpr);
    canvas.width = S; canvas.height = S;
    var ctx = canvas.getContext('2d');
    var rand = mulberry32(hash(seed));
    var u = S / 1000;

    var c = {
      ground: token('--art-ground'), verdant: token('--art-verdant'), cyan: token('--art-cyan'),
      violet: token('--art-violet'), pale: token('--ink'), brass: token('--brass')
    };
    function pick() {
      var r = rand();
      return r < 0.5 ? c.verdant : r < 0.68 ? c.pale : r < 0.84 ? c.cyan : c.violet;
    }

    var ops = [];
    var cx = S / 2 + (rand() - 0.5) * S * 0.04;
    var cy = S / 2 + (rand() - 0.5) * S * 0.04;
    var theta = rand() * Math.PI / 2;

    // Ground and stars
    ops.push(function () { ctx.globalAlpha = 1; ctx.fillStyle = c.ground; ctx.fillRect(0, 0, S, S); });
    var stars = [];
    for (var s = 0; s < 240; s++) stars.push([rand() * S, rand() * S, (0.8 + rand() * 1.2) * u, 0.25 + rand() * 0.6, rand() < 0.15 ? c.brass : c.pale]);
    ops.push(function () {
      stars.forEach(function (st) { ctx.globalAlpha = st[3]; ctx.fillStyle = st[4]; ctx.beginPath(); ctx.arc(st[0], st[1], st[2], 0, Math.PI * 2); ctx.fill(); });
    });

    // Filaments: closed loops that fold into a rotated square
    var loops = 170 + Math.floor(rand() * 80);
    for (var i = 0; i < loops; i++) {
      var inner = rand() < 0.3;
      (function (col, R, e, rot, ox, oy, alpha, lw, m, ph, amp, lobes) {
        ops.push(function () {
          ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = lw;
          ctx.beginPath();
          for (var k = 0; k <= 320; k++) {
            var t = (k / 320) * Math.PI * 2;
            var w = 1 + amp * Math.sin(t * m + ph);
            var x = R * w * (Math.cos(t) + e * Math.cos(lobes * t));
            var y = R * w * (Math.sin(t) - e * Math.sin(lobes * t));
            var px = cx + ox + x * Math.cos(rot) - y * Math.sin(rot);
            var py = cy + oy + x * Math.sin(rot) + y * Math.cos(rot);
            if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.stroke();
        });
      })(pick(),
        inner ? S * (0.1 + rand() * 0.16) : S * (0.2 + Math.pow(rand(), 0.6) * 0.2),
        inner ? 0.25 + rand() * 0.35 : 0.08 + rand() * 0.2,
        theta + (rand() - 0.5) * (inner ? 3.1 : 0.45),
        (rand() - 0.5) * S * 0.04, (rand() - 0.5) * S * 0.04, 0.14 + rand() * 0.3,
        (0.8 + rand() * 1.3) * u, 2 + Math.floor(rand() * 6), rand() * 6.28, rand() * 0.07,
        inner ? (rand() < 0.5 ? 2 : 4) : 3);
    }

    // A rosette of pale ellipses
    var petals = 26 + Math.floor(rand() * 18);
    var ring = S * (0.17 + rand() * 0.06);
    var rx = S * (0.12 + rand() * 0.05), ry = rx * (0.35 + rand() * 0.25);
    for (var p = 0; p < petals; p++) {
      (function (a) {
        ops.push(function () {
          ctx.globalAlpha = 0.32; ctx.strokeStyle = c.pale; ctx.lineWidth = 0.9 * u;
          ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * ring, cy + Math.sin(a) * ring, rx, ry, a, 0, Math.PI * 2); ctx.stroke();
        });
      })((p / petals) * Math.PI * 2 + theta);
    }

    // The small central ring
    ops.push(function () {
      ctx.globalAlpha = 0.7; ctx.strokeStyle = c.pale; ctx.lineWidth = 1.4 * u;
      ctx.beginPath(); ctx.arc(cx, cy, S * (0.04 + rand() * 0.02), 0, Math.PI * 2); ctx.stroke();
    });

    // A drift of particles leaving the form
    var corner = Math.floor(rand() * 4);
    var x = cx + (corner % 2 ? 1 : -1) * S * 0.28, y = cy + (corner < 2 ? 1 : -1) * S * 0.24;
    var dx = (corner % 2 ? 1 : -1) * S * 0.005, dy = (corner < 2 ? 1 : -1) * S * 0.004;
    for (var d = 0; d < 70; d++) {
      x += dx + (rand() - 0.5) * S * 0.01; y += dy + (rand() - 0.5) * S * 0.01;
      (function (px, py, size, col, a) {
        ops.push(function () { ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(px, py, size, size); });
      })(x, y, (3 + rand() * 6) * u, rand() < 0.6 ? c.cyan : rand() < 0.5 ? c.verdant : c.violet, 0.4 + rand() * 0.5);
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || opts.animate === false) {
      ops.forEach(function (op) { op(); });
      if (opts.onDone) opts.onDone();
      return;
    }
    var frames = Math.round((opts.duration || 2600) / 16.7);
    var per = Math.max(1, Math.ceil(ops.length / frames));
    var i0 = 0;
    (function step() {
      for (var n = 0; n < per && i0 < ops.length; n++) ops[i0++]();
      if (i0 < ops.length) requestAnimationFrame(step); else if (opts.onDone) opts.onDone();
    })();
  }

  window.EndlessSketch = { draw: draw };
})();
