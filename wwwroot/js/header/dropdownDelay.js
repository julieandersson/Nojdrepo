/**
 * dropdownDelay.js - DROPDOWN-MENY I DESKTOP
 * -------------------------------------------------------------
 * hover-fördröjning på dropdown-menyn i desktop.
 * CSS visar menyn när .dropdown-menu har klassen .visible.
 */

export function initDropdownDelay() {
  // hittar alla menyposter som har en dropdown
  const dropdowns = document.querySelectorAll(".has-dropdown");
  if (!dropdowns.length) return; // ingen return

  dropdowns.forEach((dropdown) => {
    // timers per dropdown för att kunna rensa rätt vid interaktion
    let showId, hideId;

    // själva dropdown-panelen
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!menu) return; // saknas panel - hoppa över

    /**
     * visar dropdown med fördröjning.
     * efter 400 ms: sätt .visible
     */
    const show = () => {
      clearTimeout(hideId);
      showId = setTimeout(() => menu.classList.add("visible"), 400);
    };

    /**
     * döljer dropdown med kortare fördröjning.
     * efter 200 ms: ta bort .visible
     */
    const hide = () => {
      clearTimeout(showId);
      hideId = setTimeout(() => menu.classList.remove("visible"), 200);
    };

    // när markören går in/ut över triggern (li.has-dropdown)
    dropdown.addEventListener("mouseenter", show);
    dropdown.addEventListener("mouseleave", hide);
    // Om användaren för muspekaren in i själva menyn: avbryt pågående hide för att undvika att menyn stängs under muspekaren
    menu.addEventListener("mouseenter", () => clearTimeout(hideId));
    menu.addEventListener("mouseleave", hide);
  });
}