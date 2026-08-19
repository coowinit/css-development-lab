(() => {
  const accordions = document.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    const items = [...accordion.querySelectorAll(".accordion-item")];
    const triggers = [...accordion.querySelectorAll(".accordion-trigger")];

    function setItemState(item, shouldOpen) {
      const trigger = item.querySelector(".accordion-trigger");
      const panelId = trigger?.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      if (!trigger || !panel) return;

      item.classList.toggle("is-open", shouldOpen);
      trigger.setAttribute("aria-expanded", String(shouldOpen));

      // 本实验始终至少保留一项展开，因此当前展开项不可再次折叠。
      trigger.setAttribute("aria-disabled", String(shouldOpen));

      panel.setAttribute("aria-hidden", String(!shouldOpen));
      panel.inert = !shouldOpen;
    }

    // 以 HTML 初始的 .is-open 为唯一初始状态来源，并同步所有 ARIA / inert 状态。
    items.forEach((item) => {
      setItemState(item, item.classList.contains("is-open"));
    });

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const currentItem = trigger.closest(".accordion-item");
        if (!currentItem) return;

        // 当前项已经打开时不关闭，确保至少保留一个展开项。
        if (currentItem.classList.contains("is-open")) return;

        items.forEach((item) => {
          setItemState(item, item === currentItem);
        });
      });
    });
  });
})();
