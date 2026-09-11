const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
  const rise = document.querySelectorAll('[data-rise]');
  if (!reduce && 'IntersectionObserver' in window) {
    const rIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          rIo.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    rise.forEach(el => rIo.observe(el));
  } else {
    rise.forEach(el => el.classList.add('is-in'));
  }

  const links = document.querySelectorAll('[data-navlink]');
  const anchors = document.querySelectorAll('[data-anchor]');
  if ('IntersectionObserver' in window) {
    const nIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach(a => a.classList.toggle('nav-on', a.dataset.navlink === id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    anchors.forEach(sec => nIo.observe(sec));
  }
});
