(() => {
  const body = document.body;
  const toggle = document.querySelector("[data-menu-toggle]");
  const drawer = document.querySelector("[data-drawer]");
  const closeButton = document.querySelector("[data-drawer-close]");
  const backdrop = document.querySelector("[data-backdrop]");
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  if (!toggle || !drawer || !closeButton || !backdrop) return;

  function openDrawer() {
    body.classList.add("nav-open");
    drawer.classList.add("is-open");
    backdrop.hidden = false;

    requestAnimationFrame(() => {
      backdrop.classList.add("is-visible");
    });

    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    closeButton.focus();
  }

  function closeDrawer() {
    body.classList.remove("nav-open");
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");

    window.setTimeout(() => {
      backdrop.hidden = true;
    }, 260);
  }

  toggle.addEventListener("click", openDrawer);
  closeButton.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  submenuToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".has-children");
      const isOpen = item.classList.toggle("is-open");
      const itemName = item.querySelector(".mobile-row > a")?.textContent.trim() || "子菜单";

      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", `${isOpen ? "收起" : "展开"}${itemName}子菜单`);
    });
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
})();
