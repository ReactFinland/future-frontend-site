(() => {
  const storageKey = "future-frontend-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const getStoredTheme = () => {
    try {
      const storedTheme = window.localStorage.getItem(storageKey);

      return storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : null;
    } catch {
      return null;
    }
  };

  const getTheme = () =>
    getStoredTheme() || (media.matches ? "dark" : "light");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  };

  const syncToggleButtons = (theme) => {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const nextTheme = theme === "dark" ? "light" : "dark";

      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("title", `Switch to ${nextTheme} mode`);

      const label = button.querySelector("[data-theme-label]");

      if (label) {
        label.textContent = `Switch to ${nextTheme} mode`;
      }
    });
  };

  const setTheme = (theme) => {
    applyTheme(theme);
    syncToggleButtons(theme);
  };

  const initializeToggleButtons = () => {
    setTheme(getTheme());

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {
          // Ignore storage errors and keep the current page interactive.
        }

        setTheme(nextTheme);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeToggleButtons, {
      once: true,
    });
  } else {
    initializeToggleButtons();
  }

  const handleSystemThemeChange = (event) => {
    if (getStoredTheme()) {
      return;
    }

    setTheme(event.matches ? "dark" : "light");
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleSystemThemeChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(handleSystemThemeChange);
  }
})();
