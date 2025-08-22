/**
 * tabs.js - tabb-hanterare på produktsida
 * Initierar klickbeteende för tabb-komponenten
 * lägger till 'is-active' på vald tab och motsvarande panel
 */
export function initTabs(containerSelector = '.product-tabs') {
  const containers = document.querySelectorAll(containerSelector);

  if (!containers.length) return;

  containers.forEach(container => {
    const tabs   = container.querySelectorAll('.product-tab');
    const panels = container.parentElement.querySelectorAll('.tab-panels .tab-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = 'tab-' + btn.dataset.tab;

        // återställ
        tabs.forEach(b => b.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));

        // aktivera
        btn.classList.add('is-active');
        const panel = document.getElementById(id);
        if (panel) panel.classList.add('is-active');
      });
    });
  });
}