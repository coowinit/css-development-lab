(() => {
  const drawer = document.querySelector("[data-drawer]");
  const backdrop = document.querySelector("[data-drawer-backdrop]");
  const closeButton = document.querySelector("[data-drawer-close]");
  const title = document.querySelector("[data-drawer-title]");
  const eyebrow = document.querySelector("[data-drawer-eyebrow]");
  const body = document.querySelector("[data-drawer-body]");
  const foot = document.querySelector("[data-drawer-foot]");
  const openButtons = document.querySelectorAll("[data-drawer-open]");
  const pageContent = document.querySelector("[data-page-content]");

  if (!drawer || !backdrop || !closeButton || !body || !foot || !pageContent) return;

  const configs = {
    nav: {
      eyebrow: "NAVIGATION",
      title: "网站导航",
      template: "drawer-nav-template",
      footer: ""
    },
    filter: {
      eyebrow: "PRODUCT FILTER",
      title: "筛选产品",
      template: "drawer-filter-template",
      footer: '<button class="drawer-action" type="button">应用筛选</button>'
    },
    cart: {
      eyebrow: "MINI CART",
      title: "购物车",
      template: "drawer-cart-template",
      footer: '<button class="drawer-action" type="button">查看购物车</button>'
    }
  };

  let lastTrigger = null;

  function renderContent(type) {
    const config = configs[type];
    if (!config) return false;

    const template = document.getElementById(config.template);
    if (!template) return false;

    eyebrow.textContent = config.eyebrow;
    title.textContent = config.title;
    body.replaceChildren(template.content.cloneNode(true));
    foot.innerHTML = config.footer;

    return true;
  }

  function openDrawer(type, trigger) {
    if (!renderContent(type)) return;

    lastTrigger = trigger;
    drawer.inert = false;
    pageContent.inert = true;
    document.body.classList.add("drawer-open");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");

    backdrop.hidden = false;
    requestAnimationFrame(() => {
      backdrop.classList.add("is-visible");
      closeButton.focus();
    });
  }

  function closeDrawer({ restoreFocus = true } = {}) {
    if (!drawer.classList.contains("is-open")) return;

    document.body.classList.remove("drawer-open");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("is-visible");
    pageContent.inert = false;

    window.setTimeout(() => {
      backdrop.hidden = true;
    }, 260);

    if (restoreFocus && lastTrigger) {
      lastTrigger.focus();
    }

    drawer.inert = true;
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openDrawer(button.dataset.drawerOpen, button);
    });
  });

  closeButton.addEventListener("click", () => closeDrawer());
  backdrop.addEventListener("click", () => closeDrawer());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  drawer.addEventListener("click", (event) => {
    if (event.target.closest(".drawer-nav a")) {
      closeDrawer({ restoreFocus: false });
    }
  });
})();
