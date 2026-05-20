(function () {
  var themes = [
    { id: "dark", label: "Тёмная" },
    { id: "rose", label: "Розовая" },
    { id: "classic", label: "Классика" },
    { id: "forest", label: "Лес" },
    { id: "ocean", label: "Океан" },
    { id: "amber", label: "Янтарь" },
    { id: "sakura", label: "Сакура" },
    { id: "coral", label: "Коралл" },
    { id: "midnight", label: "Полночь" },
    { id: "ink", label: "Чернила" }
  ];

  var storageKey = "go-landing-theme";
  var defaultTheme = "dark";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-switcher-toggle");
  var menu = document.getElementById("theme-switcher-menu");
  var wrapper = document.getElementById("theme-switcher");

  if (!toggle || !menu) return;

  function setTheme(id) {
    root.setAttribute("data-theme", id);
    localStorage.setItem(storageKey, id);

    menu.querySelectorAll(".theme-switcher__option").forEach(function (item) {
      var active = item.getAttribute("data-theme") === id;
      item.setAttribute("aria-selected", active ? "true" : "false");
    });

    var current = themes.find(function (t) { return t.id === id; });
    if (current) {
      toggle.textContent = current.label;
    }
  }

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  themes.forEach(function (theme) {
    var item = document.createElement("li");
    item.setAttribute("role", "option");
    item.setAttribute("data-theme", theme.id);
    item.setAttribute("aria-selected", "false");
    item.className = "theme-switcher__option theme-switcher__option--" + theme.id;
    item.textContent = theme.label;
    item.addEventListener("click", function () {
      setTheme(theme.id);
      closeMenu();
    });
    menu.appendChild(item);
  });

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  document.addEventListener("click", function (e) {
    if (!wrapper.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  var saved = localStorage.getItem(storageKey);
  var initial = themes.some(function (t) { return t.id === saved; }) ? saved : defaultTheme;
  setTheme(initial);
})();
