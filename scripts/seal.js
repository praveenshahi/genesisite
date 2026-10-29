/* The Seal: an ancient seal drawn from a modern signature. Every mark comes from a hash of the record's ID,
   so the same ID always gives the same seal. Use <div data-seal="ID" data-seal-size="small|full"></div> or Genesis.seal(). */
(function () {
  var S = window.GenesisSeed;
  var SVG = 'http://www.w3.org/2000/svg';
  var uid = 0;

  function el(name, attrs, parent) {
    var n = document.createElementNS(SVG, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function polar(r, a) { return [(r * Math.cos(a)).toFixed(2), (r * Math.sin(a)).toFixed(2)]; }

  function seal(host, id, size) {
    id = String(id || 'genesis');
    size = size || host.getAttribute('data-seal-size') || 'full';
    var small = size === 'small';
    var rand = S.rand('seal:' + id);
    host.innerHTML = '';
    host.classList.add('seal', small ? 'seal--small' : 'seal--full');
    var svg = el('svg', { viewBox: '-100 -100 200 200', class: 'seal__svg', role: 'img', 'aria-label': 'Seal for ' + id }, host);

    el('circle', { r: 96, class: 'seal__line seal__line--bold' }, svg);
    el('circle', { r: small ? 84 : 91, class: 'seal__line' }, svg);

    if (!small) {
      // The ring text: the Sanskrit and Latin words for recognition, and the record's short ID
      var pid = 'seal-ring-' + (++uid);
      el('path', { id: pid, d: 'M0 -79 A79 79 0 1 1 -0.01 -79', fill: 'none' }, svg);
      var text = el('text', { class: 'seal__text' }, svg);
      var tp = el('textPath', { href: '#' + pid, textLength: '480', lengthAdjust: 'spacing' }, text);
      tp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pid);
      var deva = el('tspan', { class: 'seal__deva', lang: 'sa' }, tp);
      deva.textContent = 'प्रत्यभिज्ञा';
      var lat = el('tspan', {}, tp);
      lat.textContent = ' · RECOGNITIO · ' + id.replace(/[^0-9a-z]/gi, '').slice(0, 8).toUpperCase() + ' ·';
      el('circle', { r: 68, class: 'seal__line' }, svg);
    }

    // The signature ring: tick lengths read straight from the hash
    var inner = small ? 46 : 46, outer = small ? 80 : 64;
    var ticks = small ? 48 : 72, d = '';
    for (var i = 0; i < ticks; i++) {
      var a = (i / ticks) * Math.PI * 2 - Math.PI / 2;
      var len = 3 + Math.floor(rand() * (outer - inner - 4));
      var p1 = polar(inner, a), p2 = polar(inner + len, a);
      d += 'M' + p1.join(' ') + 'L' + p2.join(' ');
    }
    el('path', { d: d, class: 'seal__ticks' }, svg);
    el('circle', { r: inner - 4, class: 'seal__line' }, svg);

    // Six nodes on an orbit, like the emblem's constellation, placed by the hash
    var rot = rand() * Math.PI, nodes = [];
    for (var n = 0; n < 6; n++) {
      var t = rand() * Math.PI * 2, rr = 16 + rand() * 20;
      nodes.push([rr * Math.cos(t + rot), rr * Math.sin(t + rot)]);
    }
    nodes.sort(function (p, q) { return Math.atan2(p[1], p[0]) - Math.atan2(q[1], q[0]); });
    el('path', { d: 'M' + nodes.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L') + 'Z', class: 'seal__line' }, svg);
    nodes.forEach(function (p) { el('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: small ? 3.2 : 2.6, class: 'seal__node' }, svg); });
    el('circle', { r: 9, class: 'seal__line' }, svg);
    el('circle', { r: 3.4, class: 'seal__node' }, svg);
    return host;
  }

  document.querySelectorAll('[data-seal]').forEach(function (h) { seal(h, h.getAttribute('data-seal')); });
  window.Genesis = window.Genesis || {};
  window.Genesis.seal = seal;
})();
