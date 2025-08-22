// site.js - startpunkt för frontend-js
// laddar modulära init-funktioner som körs när DOM är redo 

import { initMobileNav } from './nav/mobileNav.js';
import { initStickyHeaderBelowTopmenu } from './header/stickyOffset.js';
import { initShrinkLogoOnScroll } from './header/shrinkLogo.js';
import { initReorderTopmenuForTablet } from './header/reorderTopmenu.js';
import { initDropdownDelay } from './header/dropdownDelay.js';
import { initFlyout } from './ui/flyout.js';
import { initCategoriesProducts } from './pages/categories-products.js';
import { initTabs } from './ui/tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  // header & navigationsbeteenden
  initMobileNav();
  initStickyHeaderBelowTopmenu();
  initShrinkLogoOnScroll();
  initReorderTopmenuForTablet();
  initDropdownDelay();
  initCategoriesProducts();
  initTabs();

  // Flyouts (login och varukorg)
  initFlyout({
    triggerSel: '#loginBtn',
    panelSel:   '#loginFlyout',
    overlaySel: '#loginOverlay',
    closeSel:   '#closeFlyout'
  });
  initFlyout({
    triggerSel: '#cartBtn',
    panelSel:   '#cartFlyout',
    overlaySel: '#cartOverlay',
    closeSel:   '#closeCartFlyout'
  });
});