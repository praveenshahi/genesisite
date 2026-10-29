/* The sky: a fixed star field on night pages, star charts in [data-stars], and the Astrolabe in [data-astrolabe].
   All drawn in code from tokens.css; the emblem PNG sits at the astrolabe's centre, never redrawn. */
(function () {
  var S = window.GenesisSeed;
  var SVG = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Star field ----------
  function drawStars(canvas, seed, opts) {
    opts = opts || {};
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || window.innerWidth, h = rect.height || window.innerHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var rand = S.rand(seed);
    var pale = S.token('--ink'), brass = S.token('--brass'), faint = S.token('--ink-faint');

    var count = Math.min(opts.max || 520, Math.round((w * h) / (opts.density || 4200)));
    for (var i = 0; i < count; i++) {
      var r = rand();
      ctx.globalAlpha = 0.18 + rand() * 0.55;
      ctx.fillStyle = r < 0.12 ? brass : r < 0.3 ? faint : pale;
      ctx.beginPath();
      ctx.arc(rand() * w, rand() * h, 0.35 + Math.pow(rand(), 3) * 1.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Constellations: chains of six stars along an orbit, the emblem's own pattern
    var groups = opts.groups == null ? Math.max(2, Math.round((w * h) / 380000)) : opts.groups;
    for (var g = 0; g < groups; g++) {
      var cx = rand() * w, cy = rand() * h, rx = 60 + rand() * 110, ry = rx * (0.3 + rand() * 0.3);
      var rot = rand() * Math.PI, start = rand() * Math.PI * 2, pts = [];
      for (var n = 0; n < 6; n++) {
        var t = start + n * (0.45 + rand() * 0.25);
        var x = rx * Math.cos(t), y = ry * Math.sin(t);
        pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot) + (rand() - 0.5) * 12, cy + x * Math.sin(rot) + y * Math.cos(rot) + (rand() - 0.5) * 12]);
      }
      ctx.globalAlpha = 0.16; ctx.strokeStyle = faint; ctx.lineWidth = 0.6;
      ctx.beginPath();
      pts.forEach(function (p, k) { if (k) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); });
      ctx.stroke();
      pts.forEach(function (p) {
        ctx.globalAlpha = 0.85; ctx.fillStyle = pale;
        ctx.beginPath(); ctx.arc(p[0], p[1], 1.2, 0, Math.PI * 2); ctx.fill();
      });
    }
  }

  var field = document.createElement('canvas');
  field.className = 'starfield';
  field.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(field, document.body.firstChild);
  function paintField() { drawStars(field, 'the genesis sky'); }
  paintField();
  var resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(paintField, 200); });

  document.querySelectorAll('[data-stars]').forEach(function (box) {
    var c = document.createElement('canvas');
    c.className = 'starchart';
    c.setAttribute('aria-hidden', 'true');
    box.insertBefore(c, box.firstChild);
    drawStars(c, box.getAttribute('data-stars') || 'chart', { density: 1600, groups: 1 });
  });

  // ---------- The Astrolabe ----------
  function el(name, attrs, parent) {
    var n = document.createElementNS(SVG, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function polar(r, deg) {
    var a = (deg - 90) * Math.PI / 180;
    return [r * Math.cos(a), r * Math.sin(a)];
  }

  function astrolabe(host) {
    var id = 'astro' + Math.random().toString(36).slice(2, 7);
    var svg = el('svg', { viewBox: '-210 -210 420 420', class: 'astro', 'aria-hidden': 'true', focusable: 'false' });
    var defs = el('defs', {}, svg);
    var clip = el('clipPath', { id: id }, defs);
    el('circle', { r: 150 }, clip);

    el('circle', { r: 198, class: 'astro__ground' }, svg);

    // The plate: almucantars, equator and tropics, horizon and meridian
    var plate = el('g', { class: 'astro__plate', 'clip-path': 'url(#' + id + ')' }, svg);
    for (var i = 0; i < 9; i++) el('circle', { cx: 0, cy: -18 - i * 9, r: 132 - i * 13 }, plate);
    for (var j = 0; j < 12; j++) {
      var p = polar(150, j * 30);
      el('line', { x1: 0, y1: -44, x2: p[0], y2: p[1], class: 'astro__azimuth' }, plate);
    }
    el('circle', { r: 150, class: 'astro__strong' }, svg);
    el('circle', { r: 104, class: 'astro__strong' }, svg);
    el('circle', { r: 72, class: 'astro__faint' }, svg);
    el('line', { x1: -150, y1: 0, x2: 150, y2: 0, class: 'astro__faint' }, svg);
    el('line', { x1: 0, y1: -150, x2: 0, y2: 150, class: 'astro__faint' }, svg);

    // The limb: degree ticks and the hours in Roman numerals
    var limb = el('g', { class: 'astro__limb' }, svg);
    el('circle', { r: 198 }, limb);
    el('circle', { r: 184 }, limb);
    el('circle', { r: 160 }, limb);
    var d = '';
    for (var t = 0; t < 360; t++) {
      var len = t % 15 === 0 ? 14 : t % 5 === 0 ? 8 : 4;
      var a1 = polar(198, t), a2 = polar(198 - len, t);
      d += 'M' + a1[0].toFixed(1) + ' ' + a1[1].toFixed(1) + 'L' + a2[0].toFixed(1) + ' ' + a2[1].toFixed(1);
    }
    el('path', { d: d, class: 'astro__ticks' }, limb);
    var hours = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    for (var hh = 0; hh < 24; hh++) {
      var deg = hh * 15, pt = polar(172, deg);
      var txt = el('text', { x: pt[0].toFixed(1), y: pt[1].toFixed(1), class: 'astro__hour', transform: 'rotate(' + deg + ' ' + pt[0].toFixed(1) + ' ' + pt[1].toFixed(1) + ')' }, limb);
      txt.textContent = hours[hh % 12];
    }

    // The rete: the ecliptic, star pointers and an orbit with six nodes
    var rete = el('g', { class: 'astro__rete' }, svg);
    el('circle', { cx: 0, cy: -36, r: 112 }, rete);
    el('circle', { cx: 0, cy: -36, r: 102, class: 'astro__thin' }, rete);
    [20, 110, 200, 290].forEach(function (deg) {
      var q = polar(150, deg);
      el('line', { x1: 0, y1: 0, x2: q[0].toFixed(1), y2: q[1].toFixed(1), class: 'astro__thin' }, rete);
    });
    var rand = S.rand('astrolabe');
    for (var s = 0; s < 11; s++) {
      var sd = rand() * 360, sr = 60 + rand() * 82;
      var tip = polar(sr, sd), base1 = polar(sr - 16, sd - 3), base2 = polar(sr - 16, sd + 3);
      el('path', { d: 'M' + base1.join(' ') + 'Q' + polar(sr - 8, sd).join(' ') + ' ' + tip.join(' ') + 'Q' + polar(sr - 8, sd).join(' ') + ' ' + base2.join(' '), class: 'astro__pointer' }, rete);
      el('circle', { cx: tip[0].toFixed(1), cy: tip[1].toFixed(1), r: 1.8, class: 'astro__star' }, rete);
    }
    var orbit = el('g', { transform: 'rotate(-24)' }, rete);
    el('ellipse', { rx: 140, ry: 52, class: 'astro__thin' }, orbit);
    [200, 228, 262, 300, 330, 20].forEach(function (deg) {
      var r = deg * Math.PI / 180;
      el('circle', { cx: (140 * Math.cos(r)).toFixed(1), cy: (52 * Math.sin(r)).toFixed(1), r: 3, class: 'astro__star' }, orbit);
    });

    // The rule (alidade), which follows the scroll
    var rule = el('g', { class: 'astro__rule' }, svg);
    el('line', { x1: -192, y1: 0, x2: 192, y2: 0 }, rule);
    el('path', { d: 'M-150 -5 L-26 -1 L-26 1 L-150 5 Z M150 -5 L26 -1 L26 1 L150 5 Z', class: 'astro__vane' }, rule);

    el('circle', { r: 26, class: 'astro__hub' }, svg);
    var img = el('image', { href: 'assets/genesis-emblem-light.png', x: -19, y: -18, width: 38, height: 36 }, svg);
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/genesis-emblem-light.png');

    host.appendChild(svg);
  }
  document.querySelectorAll('[data-astrolabe]').forEach(astrolabe);

  window.GenesisSky = { drawStars: drawStars, astrolabe: astrolabe, reduce: reduce };
})();
