(function () {
  function setupHeader(header) {
    var button = header.querySelector('.menu-btn');
    var nav = header.querySelector('.nav');
    if (!button || !nav) return;

    var deskCta = header.querySelector('.desk');
    if (deskCta && !nav.querySelector('.nav-link-talk')) {
      var talkLink = document.createElement('a');
      talkLink.className = 'nav-link nav-link-talk';
      talkLink.textContent = "Let's talk";
      talkLink.href = deskCta.getAttribute('href') || '#';
      if (deskCta.getAttribute('target')) talkLink.setAttribute('target', deskCta.getAttribute('target'));
      if (deskCta.getAttribute('rel')) talkLink.setAttribute('rel', deskCta.getAttribute('rel'));
      nav.appendChild(talkLink);
    }

    if (!button.querySelector('.menu-icon')) {
      button.innerHTML =
        '<span class="menu-icon" aria-hidden="true">' +
        '<span class="menu-line"></span>' +
        '<span class="menu-line"></span>' +
        '<span class="menu-line"></span>' +
        '</span>';
    }

    function setOpen(isOpen) {
      header.classList.toggle('menu-open', isOpen);
      document.body.classList.toggle('nav-locked', isOpen);
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    setOpen(false);

    button.addEventListener('click', function () {
      var open = !header.classList.contains('menu-open');
      setOpen(open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 992 && header.classList.contains('menu-open')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) {
        setOpen(false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.header').forEach(setupHeader);
  });
})();
