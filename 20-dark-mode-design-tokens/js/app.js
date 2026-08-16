(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-label]");
  const storageKey = "css-lab-theme";

  if (!toggle) return;

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getCurrentTheme() {
    return root.dataset.theme || getSystemTheme();
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Storage may be unavailable in restricted/local preview environments.
      // The current page can still switch themes normally.
    }
  }

  function updateToggle(theme) {
    const isDark = theme === "dark";

    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "切换到浅色主题" : "切换到深色主题"
    );

    if (label) {
      label.textContent = isDark ? "浅色模式" : "深色模式";
    }
  }

  function applySavedTheme() {
    const savedTheme = getSavedTheme();

    if (savedTheme === "light" || savedTheme === "dark") {
      root.dataset.theme = savedTheme;
    }

    updateToggle(getCurrentTheme());
  }

  toggle.addEventListener("click", () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    saveTheme(nextTheme);
    updateToggle(nextTheme);
  });

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  systemTheme.addEventListener("change", () => {
    if (!root.dataset.theme) {
      updateToggle(getSystemTheme());
    }
  });

  applySavedTheme();
})();
