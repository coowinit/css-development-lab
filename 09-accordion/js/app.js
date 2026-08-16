(() => {
  const accordions = document.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    const items = [...accordion.querySelectorAll(".accordion-item")];
    const triggers = [...accordion.querySelectorAll(".accordion-trigger")];

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const currentItem = trigger.closest(".accordion-item");

        // 当前项已经打开时不关闭，确保至少保留一个展开项。
        if (currentItem.classList.contains("is-open")) {
          return;
        }

        items.forEach((item) => {
          const itemTrigger = item.querySelector(".accordion-trigger");
          const shouldOpen = item === currentItem;

          item.classList.toggle("is-open", shouldOpen);
          itemTrigger.setAttribute("aria-expanded", String(shouldOpen));
        });
      });
    });
  });
})();
