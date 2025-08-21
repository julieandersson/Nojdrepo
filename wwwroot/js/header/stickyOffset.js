/**
 * stickyOffset.js
 * -------------------------------------------------------------
 * Håller <header> precis under .topmenu på DESKTOP.
 * Gäller bara på desktop (≥ 1097px). På mindre skärmar nollställs top:0.
 
 * vid tablet/mobil flyttas .topmenu efter <header> och vid desktop flyttas den tillbaka före <header>
 */

export function initStickyHeaderBelowTopmenu() {
  const BP = 1096;
  const mqDesktop = window.matchMedia(`(min-width:${BP + 1}px)`);
  const topmenu = document.querySelector('.topmenu');
  const header  = document.querySelector('header');
  if (!topmenu || !header) return;

  let ticking = false;

  /**
   * Sätter header.style.top så att header lägger sig direkt under topmenu på desktop.
  */
    function layout() {
      if (!mqDesktop.matches) { header.style.top = '0px'; ticking = false; return; }
      const before =
        !!(topmenu.compareDocumentPosition(header) & Node.DOCUMENT_POSITION_FOLLOWING);
      header.style.top = before ? Math.max(0, topmenu.getBoundingClientRect().bottom) + 'px' : '0px';
      ticking = false;
    }

    function requestLayout(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(layout);
    }

    window.__recalcHeaderOffset = () => { ticking = false; layout(); };

    layout();
    window.addEventListener('scroll', requestLayout, { passive: true });
    window.addEventListener('resize', requestLayout);
    mqDesktop.addEventListener('change', requestLayout);
  }