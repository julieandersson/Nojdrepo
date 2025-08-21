/**
 * flyout.js — sidoflyout (t.ex. login, cart, filterpanel)
 * klasser (default):
 *   panel:  .open (visas), .closing (ut-animering)
 *   overlay: .visible (visas)
 * stöd för att byta klassnamn via options (t.ex. openClass: 'is-open')
 * stöd för flera close-triggers via extraCloseSels.
 */
export function initFlyout({
  triggerSel,
  panelSel,
  overlaySel,
  closeSel,
  extraCloseSels = [],

  // klassnamn (bakåtkompatibla defaults)
  openClass = 'open',
  closingClass = 'closing',
  overlayVisibleClass = 'visible',

  focusBackToTrigger = true
}) {
  const trigger  = document.querySelector(triggerSel);
  const panel    = document.querySelector(panelSel);
  const overlay  = document.querySelector(overlaySel);
  const closeBtn = document.querySelector(closeSel);

  if (!trigger || !panel || !overlay || !closeBtn) return null;

  const extraCloses = extraCloseSels.flatMap(sel => Array.from(document.querySelectorAll(sel)));

  let isAnimating = false;

  function open() {
    if (isAnimating || isOpen()) return;
    isAnimating = true;

    panel.classList.remove(closingClass);
    panel.classList.add(openClass);
    overlay.classList.add(overlayVisibleClass);

    // gör panel fokuserbar tillfälligt
    panel.setAttribute('tabindex', '-1');
    panel.focus();

    panel.addEventListener('transitionend', () => { isAnimating = false; }, { once: true });
  }

  function close() {
    if (isAnimating || !isOpen()) return;
    isAnimating = true;

    panel.classList.add(closingClass);
    panel.classList.remove(openClass);

    panel.addEventListener('transitionend', () => {
      panel.classList.remove(closingClass);
      overlay.classList.remove(overlayVisibleClass);
      isAnimating = false;

      panel.removeAttribute('tabindex');
      if (focusBackToTrigger) trigger.focus();
    }, { once: true });
  }

  function isOpen() {
    return panel.classList.contains(openClass);
  }

  // togglar via trigger
  const onTriggerClick = (e) => {
    e.preventDefault();
    isOpen() ? close() : open();
  };
  trigger.addEventListener('click', onTriggerClick);

  // stänghändelser
  const onClose = () => close();
  closeBtn.addEventListener('click', onClose);
  overlay.addEventListener('click', onClose);
  extraCloses.forEach(btn => btn.addEventListener('click', onClose));
  const onKeydown = (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  };
  document.addEventListener('keydown', onKeydown);

  // för ev. reset vid breakpoint
  return {
    open,
    close,
    isOpen,
    dispose() {
      trigger.removeEventListener('click', onTriggerClick);
      closeBtn.removeEventListener('click', onClose);
      overlay.removeEventListener('click', onClose);
      extraCloses.forEach(btn => btn.removeEventListener('click', onClose));
      document.removeEventListener('keydown', onKeydown);
    }
  };
}