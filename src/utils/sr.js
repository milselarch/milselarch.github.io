let sr = null;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const ScrollRevealModule = require('scrollreveal');
  const ScrollReveal = ScrollRevealModule.default || ScrollRevealModule;
  sr = ScrollReveal();
}

export default sr;
