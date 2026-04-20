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

    if (!button.querySelector('.menu-icon-open')) {
      button.innerHTML =
        '<svg class="menu-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<path d="M4 6h16M4 12h16M4 18h16"></path>' +
        '</svg>' +
        '<svg class="menu-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<path d="M6 6l12 12M18 6L6 18"></path>' +
        '</svg>';
    } else if (!button.querySelector('.menu-icon-close')) {
      var closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      closeSvg.setAttribute('class', 'menu-icon-close');
      closeSvg.setAttribute('width', '24');
      closeSvg.setAttribute('height', '24');
      closeSvg.setAttribute('viewBox', '0 0 24 24');
      closeSvg.setAttribute('fill', 'none');
      closeSvg.setAttribute('stroke', 'currentColor');
      closeSvg.setAttribute('stroke-width', '2');
      closeSvg.setAttribute('aria-hidden', 'true');
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', 'M6 6l12 12M18 6L6 18');
      closeSvg.appendChild(p);
      button.appendChild(closeSvg);
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
