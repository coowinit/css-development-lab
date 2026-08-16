(() => {
  const tabGroups = document.querySelectorAll("[data-tabs]");

  tabGroups.forEach((tabsRoot) => {
    const tabList = tabsRoot.querySelector('[role="tablist"]');
    const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
    const panels = [...tabsRoot.querySelectorAll('[role="tabpanel"]')];

    if (!tabList || tabs.length === 0) return;

    function activateTab(nextTab, moveFocus = true) {
      tabs.forEach((tab) => {
        const isActive = tab === nextTab;
        const panelId = tab.getAttribute("aria-controls");
        const panel = tabsRoot.querySelector(`#${panelId}`);

        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;

        if (panel) {
          panel.classList.toggle("is-active", isActive);
          panel.hidden = !isActive;
        }
      });

      if (moveFocus) {
        nextTab.focus();
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activateTab(tab, false);
      });
    });

    tabList.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex]);
    });
  });
})();
