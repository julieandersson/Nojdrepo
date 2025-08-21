/**
 * reorderTopmenu.js
 * -------------------------------------------------------------
 * Flyttar .topmenu under <header> på tablet/mobil och återställer ursprungsläget på desktop. 
 * Använder en placeholder-nod för att minnas exakt var topmenu låg från början.
 */
export function initReorderTopmenuForTablet() {
  // brytpunkt för tablet/mobil
  const BP = 1096;
  // noder vi arbetar med
  const header  = document.querySelector('header');
  const topmenu = document.querySelector('.topmenu');
  if (!header || !topmenu) return; // avbryt om något saknas

  // sparar ursprungsläge med placeholder
  if (!topmenu.__placeholder) {
    const ph = document.createComment('topmenu-placeholder');
    topmenu.parentNode.insertBefore(ph, topmenu);
    topmenu.__placeholder = ph;
  }

  /**
   * Flyttar topmenu beroende på viewport-bredd
   * ≤ BP: lägg direkt efter header
   * > BP: lägg tillbaka efter placeholdern (ursprungsläget)
   */
  function place() {
    if (window.innerWidth <= BP) {
      // TABLET/MOBIL: lägger topmenu som syskon direkt efter header
      if (header.nextSibling !== topmenu) {
        header.parentNode.insertBefore(topmenu, header.nextSibling);
      }
      header.style.zIndex = '1500';
      topmenu.style.zIndex = '1000';
      topmenu.style.position = 'relative';
    } else {
      // DESKTOP: återställer exakt ursprungsläge via placeholdern
      const ph = topmenu.__placeholder;
      if (ph && ph.nextSibling !== topmenu) {
        ph.parentNode.insertBefore(topmenu, ph.nextSibling);
      }
      // städar bort styles från mobilläget
      header.style.zIndex = '';
      topmenu.style.zIndex = '';
      topmenu.style.position = '';
    }

    // triggar scroll-lyssnare (för loggans och sökformulärets shrink/expand-beteende)
    if (window.__recalcHeaderOffset) window.__recalcHeaderOffset();
    window.dispatchEvent(new Event('scroll'));
  }

  place();
  window.addEventListener('resize', place);
}