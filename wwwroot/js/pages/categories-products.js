// initierar allt för Categories/Products (produktlistningssidan)
import { initFlyout } from '../ui/flyout.js';

export function initCategoriesProducts() {
  const hasLayout = document.querySelector('.products-layout');
  if (!hasLayout) return;

  initFilterChipsAndFlyout();
  initProductsViewToggle();
}

/* FILTER: chips + flyout */
function initFilterChipsAndFlyout() {
  const sidebar   = document.querySelector('.sidebar-filter');
  const backdrop  = document.querySelector('.filter-backdrop');
  const toggleBtn = document.querySelector('.filter-toggle');
  const flyout    = document.getElementById('sidebarFilter');
  if (!sidebar || !backdrop || !toggleBtn || !flyout) return;

  /* Chips/checkbox-logik */
  const chipsContainer = document.getElementById('chipsContainer');
  const activeFilters  = document.getElementById('activeFilters');
  const checkboxes     = sidebar.querySelectorAll('input[type="checkbox"]');
  const clearBtnTop    = document.getElementById('clearFiltersBtnTop');
  const clearBtnBtm    = document.getElementById('clearFiltersBtnBottom');

  function getLabelTextForInput(input) {
    const label = input.closest('label');
    if (label) {
      const clone = label.cloneNode(true);
      const inp   = clone.querySelector('input');
      if (inp) inp.remove();
      return clone.textContent.trim().replace(/\s+/g, ' ');
    }
    return input.value;
  }

  function renderChips() {
    if (!chipsContainer || !activeFilters) return;
    chipsContainer.innerHTML = '';
    const selected = Array.from(checkboxes).filter(cb => cb.checked && cb.value !== 'all');

    if (clearBtnBtm) clearBtnBtm.disabled = selected.length === 0;

    selected.forEach(cb => {
      const group         = cb.closest('.filter-group');
      const groupLabelEl  = group.querySelector('.filter-label');
      const groupLabel    = groupLabelEl ? groupLabelEl.textContent.trim().replace(/:$/, '') : '';
      const optionText    = getLabelTextForInput(cb);

      const chip = document.createElement('div');
      chip.className = 'filter-chip';
      chip.dataset.name  = cb.name;
      chip.dataset.value = cb.value;
      chip.innerHTML = `
        <button type="button" class="chip-close" aria-label="Ta bort filter">×</button>
        <span>${groupLabel ? groupLabel + ': ' : ''}${optionText}</span>
      `;
      chip.querySelector('.chip-close').addEventListener('click', () => {
        cb.checked = false;
        renderChips();
      });
      chipsContainer.appendChild(chip);
    });

    activeFilters.hidden = selected.length === 0;
  }

  function clearFilters() {
    checkboxes.forEach(cb => (cb.checked = false));
    renderChips();
  }

  function onCheckboxChange(e) {
    const cb       = e.target;
    const group    = cb.closest('.filter-group');
    const isAll    = cb.value === 'all';
    const groupCbs = group.querySelectorAll('input[type="checkbox"]');

    if (isAll && cb.checked) {
      groupCbs.forEach(x => { if (x !== cb) x.checked = false; });
    } else if (!isAll && cb.checked) {
      const allCb = group.querySelector('input[type="checkbox"][value="all"]');
      if (allCb) allCb.checked = false;
    }
    renderChips();
  }

  checkboxes.forEach(cb => cb.addEventListener('change', onCheckboxChange));
  if (clearBtnTop) clearBtnTop.addEventListener('click', clearFilters);
  if (clearBtnBtm) clearBtnBtm.addEventListener('click', clearFilters);
  renderChips();

  // Flyout (återanvänder initFlyout, men med egna klassnamn) -----
  const api = initFlyout({
    triggerSel: '.filter-toggle',
    panelSel:   '#sidebarFilter',
    overlaySel: '.filter-backdrop',
    closeSel:   '.filter-close',
    extraCloseSels: ['.show-products'], // knappen "Visa produkter" stänger
    openClass: 'is-open', // matchar CSS
    closingClass: 'closing',
    overlayVisibleClass: 'visible'
  });

  // rensar flyout-state när vi går över breakpoints till desktop
  const MOBILE_BP = 1096;

  function resetToDesktop() {
    backdrop.hidden = true;
    backdrop.classList.remove('visible');
    flyout.classList.remove('is-open', 'closing');
    flyout.setAttribute('aria-hidden', 'true');
    flyout.removeAttribute('tabindex');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    if (api && api.isOpen()) api.close();
  }

  function handleViewportChange() {
    if (window.innerWidth > MOBILE_BP) resetToDesktop();
  }

  handleViewportChange();
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('orientationchange', handleViewportChange);
}

/* LISTVY PÅ PRODUKTSIDAN (med mobilspärr)*/
function initProductsViewToggle() {
  const gridBtn  = document.querySelector('.view-btn[data-view="grid"]');
  const listBtn  = document.querySelector('.view-btn[data-view="list"]');
  const gridWrap = document.querySelector('.product-grid');
  if (!gridBtn || !listBtn || !gridWrap) return;

  let saved = localStorage.getItem('productsView') || 'grid';

  function applyView(view) {
    if (view === 'list') {
      gridWrap.classList.add('is-list');
      listBtn.classList.add('is-active');
      gridBtn.classList.remove('is-active');
      listBtn.setAttribute('aria-pressed', 'true');
      gridBtn.setAttribute('aria-pressed', 'false');
    } else {
      gridWrap.classList.remove('is-list');
      gridBtn.classList.add('is-active');
      listBtn.classList.remove('is-active');
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.setAttribute('aria-pressed', 'false');
    }
  }

  function updateButtonsForWidth() {
    const isSmall = window.innerWidth <= 577;
    if (isSmall) {
      applyView('grid');
      listBtn.hidden = true;
    } else {
      listBtn.hidden = false;
      applyView(saved);
    }
  }

  // Init
  applyView(saved);
  updateButtonsForWidth();
  window.addEventListener('resize', updateButtonsForWidth);

  // Klick
  gridBtn.addEventListener('click', () => {
    saved = 'grid';
    localStorage.setItem('productsView', saved);
    applyView(saved);
  });

  listBtn.addEventListener('click', (e) => {
    if (listBtn.hidden) { e.preventDefault(); return; }
    saved = 'list';
    localStorage.setItem('productsView', saved);
    applyView(saved);
  });
}