/**
 * mobileNav.js
 * -------------------------------------------------------------
 * Öppnar/stänger panelen via hamburgarikonen, overlay och ESC.
 * Växlar mellan rotmeny ("Meny") och produktkategorier ("Produktkategorier").
 */

export function initMobileNav() {
  // hämtar noder
  const body       = document.body;
  const nav        = document.querySelector('.navigation');
  const hamburger  = document.getElementById('hamburgerBtn');
  const overlay    = document.getElementById('navOverlay');
  if (!nav || !hamburger || !overlay) return;

  const backBtn      = nav.querySelector('.nav-back'); // tillbaka från kategorier
  const closeBtn     = nav.querySelector('.nav-close'); // stäng-knapp
  const openProducts = nav.querySelector('.js-open-products'); // länk/knapp för kategorier

  let navAnimating = false;

  // öppnar mobilmeny/panel, triggar css-transitioner
  function openNav() {
    if (navAnimating) return;
    navAnimating = true;
    nav.classList.add('open');
    body.classList.add('nav-open');
    overlay.classList.add('visible');
    nav.addEventListener('transitionend', () => { navAnimating = false; }, { once:true });
  }

  // stänger panel, tar bort klasser och återställer 
  function closeNav() {
    if (navAnimating) return;
    navAnimating = true;
    nav.classList.remove('open','show-categories');
    body.classList.remove('nav-open');
    overlay.classList.remove('visible');
    nav.addEventListener('transitionend', () => { navAnimating = false; }, { once:true });
  }

  /**
   * Visar produktkategorierna i panelen och uppdaterar rubriken
   */
  function showProducts() {
    nav.classList.add('show-categories');
    const t = document.getElementById('mobileTitle');
    if (t) t.textContent = 'Produktkategorier';
  }

  /**
   * Visar rotmenyn igen ("Meny")
   */
  function showRoot() {
    nav.classList.remove('show-categories');
    const t = document.getElementById('mobileTitle');
    if (t) t.textContent = 'Meny';
  }

  // händelser
  hamburger.addEventListener('click', openNav);
  if (closeBtn)     closeBtn.addEventListener('click', closeNav);
  if (openProducts) openProducts.addEventListener('click', showProducts);
  if (backBtn)      backBtn.addEventListener('click', showRoot);
  
  // stänger panel vid klick på overlay
  overlay.addEventListener('click', closeNav);

  // ESC stänger också panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
  });
}