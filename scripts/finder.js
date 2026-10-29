/* The Moment Finder. Nothing leaves the browser in this prototype. */
(function () {
  var form = document.getElementById('finder');
  if (!form) return;
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var screens = Array.prototype.slice.call(form.querySelectorAll('.screen'));
  var progress = document.querySelector('.finder-progress');
  var answers = {};
  var current = 0;

  function chosen(group) {
    var chip = group && group.querySelector('.g-chip[aria-pressed="true"]');
    if (!chip) return '';
    if (chip.hasAttribute('data-other')) {
      var other = group.parentNode.querySelector('.screen__other input');
      return other ? other.value.trim() : '';
    }
    return chip.getAttribute('data-value') || chip.firstChild.textContent.trim();
  }

  function valid(screen) {
    switch (screen.dataset.screen) {
      case 'ended': case 'emerged': case 'share':
        return chosen(screen.querySelector('.g-chips')) !== '';
      case 'date':
        var v = form.querySelector('#ended-on').value;
        return v !== '' && v <= today();
      case 'words':
        return form.querySelector('#title').value.trim() !== '';
      default:
        return true;
    }
  }

  function refresh() {
    var screen = screens[current];
    var next = screen.querySelector('[data-next]');
    if (next) next.disabled = !valid(screen);
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function longDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function collect() {
    answers.ended = chosen(form.querySelector('[data-field="ended"]'));
    answers.between = chosen(form.querySelector('[data-field="between"]'));
    answers.emerged = chosen(form.querySelector('[data-field="emerged"]'));
    answers.date = form.querySelector('#ended-on').value;
    answers.title = form.querySelector('#title').value.trim();
    answers.story = form.querySelector('#story').value;
    answers.share = chosen(form.querySelector('[data-field="share"]'));
  }

  function show(index) {
    screens[current].hidden = true;
    current = index;
    var screen = screens[current];
    screen.hidden = false;
    root.setAttribute('data-theme', screen.dataset.ground);

    // The thin brass line runs across the six questions only
    var step = Math.min(Math.max(index, 0), 6);
    progress.style.setProperty('--progress', String(step / 6));
    progress.style.visibility = index >= 1 && index <= 6 ? 'visible' : 'hidden';

    window.scrollTo(0, 0);
    var title = screen.querySelector('.screen__title');
    if (title) title.focus({ preventScroll: true });
    refresh();

    var name = screen.dataset.screen;
    if (name === 'pause') setTimeout(function () { show(index + 1); }, reduce ? 800 : 5200);
    if (name === 'reveal') reveal(screen);
    if (name === 'done') done();
  }

  function fillOut() {
    form.querySelectorAll('[data-out="title"]').forEach(function (el) { el.textContent = answers.title; });
    form.querySelectorAll('[data-out="date"]').forEach(function (el) { el.textContent = longDate(answers.date); });
  }

  function reveal(screen) {
    collect();
    fillOut();
    screen.classList.remove('is-revealed');
    var canvas = document.getElementById('sketch');
    var seed = [answers.date, answers.ended, answers.between, answers.emerged, answers.title].join('|');
    requestAnimationFrame(function () {
      screen.classList.add('is-revealed');
      window.EndlessSketch.draw(canvas, seed, { duration: 3200 });
    });
  }

  function done() {
    var from = document.getElementById('sketch');
    var to = document.getElementById('done-sketch');
    to.width = from.width; to.height = from.height;
    to.getContext('2d').drawImage(from, 0, 0);
  }

  // Wire chips, "Something else" fields and every input
  window.Genesis.chips(form, function (group, chip) {
    var other = group.parentNode.querySelector('.screen__other');
    if (other) {
      var open = chip.hasAttribute('data-other') && chip.getAttribute('aria-pressed') === 'true';
      other.hidden = !open;
      if (open) other.querySelector('input').focus();
    }
    refresh();
  });
  form.addEventListener('input', function (e) {
    if (e.target.id === 'story') form.querySelector('[data-count]').textContent = e.target.value.length.toLocaleString('en-GB');
    refresh();
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
      e.preventDefault();
      var next = screens[current].querySelector('[data-next]');
      if (next && !next.disabled) next.click();
    }
  });
  form.addEventListener('click', function (e) {
    if (e.target.closest('[data-next]')) { if (valid(screens[current])) show(current + 1); }
    else if (e.target.closest('[data-back]')) show(current - 1);
  });

  form.querySelector('#ended-on').max = today();
  show(0);
})();
