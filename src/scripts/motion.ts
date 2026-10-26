// Typewriter reveals: the hero `whoami` types once on load, section prompts type when scrolled into view.
// Full text stays in the HTML (and in a screen-reader-only copy); nothing runs under reduced motion.
const STEP_MS = 45;

function prepare(el: HTMLElement): (() => void) | null {
  const full = el.textContent ?? '';
  if (!full) return null;
  el.textContent = '';
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = full;
  const visible = document.createElement('span');
  visible.setAttribute('aria-hidden', 'true');
  el.append(sr, visible);
  return () => {
    let i = 0;
    const tick = () => {
      visible.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(tick, STEP_MS);
    };
    tick();
  };
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        starters.get(entry.target)?.();
      }
    },
    { threshold: 1 },
  );
  const starters = new Map<Element, () => void>();
  document.querySelectorAll<HTMLElement>('[data-type]').forEach((el) => {
    const start = prepare(el);
    if (start) {
      starters.set(el, start);
      io.observe(el);
    }
  });
}
