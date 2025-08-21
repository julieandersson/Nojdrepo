/**
 * shrinkLogo.js
 * -------------------------------------------------------------
 * Krymper loggan (togglar .logo.shrink) vid scroll förbi topmenyn på desktop i standard-läge. 
 * På checkout-sidor krymper loggan även på tablet/mobil.
 * Sökfältet i headern expanderas åt vänster
 */
export function initShrinkLogoOnScroll() {
  const BP = 1096;
  const mqDesktop = window.matchMedia(`(min-width:${BP+1}px)`);

  // relevanta noder
  const topmenu       = document.querySelector('.topmenu');
  const logo          = document.querySelector('.logo');
  const searchWrapper = document.querySelector('.search-wrapper');
  const body          = document.body;

  // utan logga, avbryt
  if (!logo) return;

  // beräknar och applicerar rätt "shrink"-status.
  function apply() {
    const isCheckout = body.classList.contains('is-checkout');
    let shrink = false;

    if (mqDesktop.matches) {
      // DESKTOP
      shrink = isCheckout
        ? (window.scrollY > 20)
        : (topmenu ? (topmenu.getBoundingClientRect().bottom <= 0) : (window.scrollY > 20));
    } else {
      // TABLET/MOBIL
      shrink = isCheckout ? (window.scrollY > 20) : false;
    }

    // togglar loggans shrink-klass
    logo.classList.toggle('shrink', shrink);

    /** expanderar sökrutan endast vid:
    * desktop
    * ej checkoutsidor
    * krympt logga */
    if (searchWrapper) {
      const shouldExpand = shrink && mqDesktop.matches && !isCheckout;
      searchWrapper.classList.toggle('expand-left', shouldExpand);
    }
  }

   // lyssnar på scroll/resize och kör initialt
  window.addEventListener('scroll', apply, { passive:true });
  window.addEventListener('resize', apply);
  apply();
}