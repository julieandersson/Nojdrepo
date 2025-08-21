/**
 * flyout.js — sidoflyout för tex logga in och varukorg
 * Bygger på CSS-klasser:
 *   panel:  .open (visas), .closing (ut-animering)
 *   overlay: .visible (visas)
 * Hanterar ESC, overlay-klick och återfokuserar trigger efter stängning.
 */
export function initFlyout({ triggerSel, panelSel, overlaySel, closeSel }) {
  // hämtar element, avbryter om något saknas
  const trigger  = document.querySelector(triggerSel);
  const panel    = document.querySelector(panelSel);
  const overlay  = document.querySelector(overlaySel);
  const closeBtn = document.querySelector(closeSel);
  if (!trigger || !panel || !overlay || !closeBtn) return;

  // låser för att undvika spam-öppning/stängning
  let isAnimating = false;

  // öppnar panelen/flyouten
  function openFlyout() {
    if (isAnimating) return;
    isAnimating = true;
    panel.classList.remove('closing');
    panel.classList.add('open');
    overlay.classList.add('visible');
    panel.addEventListener('transitionend', () => { isAnimating = false; }, { once: true });
  }

  // stänger panelen/flyouten
  function closeFlyout() {
    if (isAnimating) return;
    isAnimating = true;
    panel.classList.add('closing');
    panel.classList.remove('open');
    panel.addEventListener('transitionend', () => {
      panel.classList.remove('closing');
      overlay.classList.remove('visible');
      isAnimating = false;
      trigger.focus();
    }, { once: true });
  }

  // togglar via trigger
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    panel.classList.contains('open') ? closeFlyout() : openFlyout();
  });

  // stänghändelser
  closeBtn.addEventListener('click', closeFlyout);
  overlay.addEventListener('click', closeFlyout);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeFlyout();
  });
}