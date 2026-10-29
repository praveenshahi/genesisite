/* THE GENESIS — shared behaviour: menu, ink reveals, glyphs, inscribed dates, choice chips. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVG = 'http://www.w3.org/2000/svg';

  // Glyphs and the deckle filter, shared by every page through <use href="#g-…">
  var seal = '';
  for (var i = 0; i < 12; i++) {
    var a = (i / 12) * Math.PI * 2;
    seal += 'M' + (12 + Math.cos(a) * 6.8).toFixed(2) + ' ' + (12 + Math.sin(a) * 6.8).toFixed(2) +
      'L' + (12 + Math.cos(a) * 8.6).toFixed(2) + ' ' + (12 + Math.sin(a) * 8.6).toFixed(2);
  }
  var glyphs = {
    threshold: '<path d="M6 20V11a6 6 0 0 1 12 0v9"/><path d="M3 20h18"/><circle cx="12" cy="15" r="1.2" class="f"/>',
    seed: '<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-24 12 12)"/><circle cx="12" cy="12" r="2.2" class="f"/><circle cx="20.2" cy="8.4" r="1" class="f"/>',
    seal: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="6"/><path d="' + seal + '"/><circle cx="12" cy="12" r="1.4" class="f"/>',
    ending: '<path d="M12 3a9 9 0 1 0 8.5 6"/><circle cx="20.5" cy="9" r="1.2" class="f"/>',
    between: '<path d="M9 4a8 8 0 0 0 0 16"/><path d="M15 4a8 8 0 0 1 0 16"/><path d="M12 9v6" stroke-dasharray="1 2"/>',
    after: '<path d="M3 16h18"/><path d="M6 16a6 6 0 0 1 12 0"/><path d="M12 7V4M6.5 9.5 5 8M17.5 9.5 19 8"/>',
    silent: '<circle cx="12" cy="12" r="1.6" class="f"/><circle cx="12" cy="12" r="8" stroke-dasharray="1.5 3"/>',
    word: '<path d="M5 4c0 6 7 6 7 11M19 4c0 6-7 6-7 11v5"/>',
    shared: '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
    thread: '<path d="M2 12c3-4 5 4 8 0s5 4 8 0 3 0 4 0"/><circle cx="6" cy="12" r="1.4" class="f"/><circle cx="14" cy="12" r="1.4" class="f"/>'
  };
  var sprite = '<svg xmlns="' + SVG + '" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">' +
    '<defs><filter id="deckle"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter></defs>';
  Object.keys(glyphs).forEach(function (k) { sprite += '<symbol id="g-' + k + '" viewBox="0 0 24 24">' + glyphs[k] + '</symbol>'; });
  document.body.insertAdjacentHTML('afterbegin', sprite + '</svg>');

  // Dates inscribed in Roman numerals, always beside the plain date
  function roman(n) {
    var map = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    var out = '';
    map.forEach(function (p) { while (n >= p[0]) { out += p[1]; n -= p[0]; } });
    return out;
  }
  function inscribe(iso) {
    var p = iso.split('-').map(Number);
    return roman(p[2]) + ' · ' + roman(p[1]) + ' · ' + roman(p[0]);
  }
  function longDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function inscribeInto(el, iso) {
    el.classList.add('idate');
    el.innerHTML = '<span class="idate__carved" aria-hidden="true"></span><span class="idate__plain"></span>';
    el.firstChild.textContent = inscribe(iso);
    el.lastChild.textContent = longDate(iso);
  }
  document.querySelectorAll('[data-inscribe]').forEach(function (el) { inscribeInto(el, el.getAttribute('data-inscribe')); });

  // Mobile menu
  var head = document.querySelector('.site-head');
  var btn = document.querySelector('.menu-btn');
  if (head && btn) {
    var setOpen = function (open) {
      head.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.menu-btn__word').textContent = open ? 'Close' : 'Menu';
    };
    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    head.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  }

  // Ink reveal and thread knots: written in as they enter the viewport
  var items = document.querySelectorAll('[data-reveal], .knot');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Choice chips (see design-system/components.md)
  window.Genesis = window.Genesis || {};
  window.Genesis.roman = roman;
  window.Genesis.inscribe = inscribe;
  window.Genesis.inscribeInto = inscribeInto;
  window.Genesis.longDate = longDate;
  window.Genesis.chips = function (scope, onChange) {
    (scope || document).querySelectorAll('.g-chips').forEach(function (group) {
      var multi = group.hasAttribute('data-multi');
      group.addEventListener('click', function (e) {
        var chip = e.target.closest('.g-chip');
        if (!chip) return;
        var on = chip.getAttribute('aria-pressed') !== 'true';
        if (!multi) group.querySelectorAll('.g-chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', String(multi ? on : true));
        if (onChange) onChange(group, chip);
      });
    });
  };
})();
