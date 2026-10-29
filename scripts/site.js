/* THE GENESIS — shared behaviour: menu, slow reveals, choice chips. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Reveal: lines arrive one by one as they enter the viewport
  var items = document.querySelectorAll('[data-reveal]');
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
