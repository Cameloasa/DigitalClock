
/* ========================================
   1. DOM ELEMENTS
======================================== */

const clock = document.getElementById("clock");
const dateDisplay = document.getElementById("dateDisplay");

const format24Button = document.getElementById("format24");
const format12Button = document.getElementById("format12");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

const settingsStatus = document.getElementById("settingsStatus");

/* ========================================
   2. CLOCK SETTINGS
======================================== */

let is24HourFormat = true;

/* ========================================
   3. UPDATE CLOCK AND DATE
======================================== */

function updateClock() {
    const now = new Date();

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !is24HourFormat
    };

    const timeString = new Intl.DateTimeFormat(
        "en-GB",
        timeOptions
    ).format(now);

    const dateString = new Intl.DateTimeFormat(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
    ).format(now);

    clock.textContent = timeString;
    dateDisplay.textContent = dateString;
}

/* ========================================
   4. UPDATE TIME FORMAT
======================================== */

function setTimeFormat(use24HourFormat) {
    is24HourFormat = use24HourFormat;

    format24Button.classList.toggle(
        "is-active",
        is24HourFormat
    );

    format12Button.classList.toggle(
        "is-active",
        !is24HourFormat
    );

    format24Button.setAttribute(
        "aria-pressed",
        String(is24HourFormat)
    );

    format12Button.setAttribute(
        "aria-pressed",
        String(!is24HourFormat)
    );

    settingsStatus.textContent = is24HourFormat
        ? "Showing the 24-hour format."
        : "Showing the 12-hour format.";

    updateClock();
}

/* ========================================
   5. TOGGLE LIGHT AND DARK THEMES
======================================== */

function toggleTheme() {
    const isLightTheme = document.body.classList.toggle(
        "light-theme"
    );

    themeIcon.textContent = isLightTheme ? "☾" : "☼";

    themeLabel.textContent = isLightTheme
        ? "Dark mode"
        : "Light mode";

    themeToggle.setAttribute(
        "aria-pressed",
        String(isLightTheme)
    );

    themeToggle.setAttribute(
        "aria-label",
        isLightTheme
            ? "Switch to dark theme"
            : "Switch to light theme"
    );
}

/* ========================================
   6. EVENT LISTENERS
======================================== */

format24Button.addEventListener("click", () => {
    setTimeFormat(true);
});

format12Button.addEventListener("click", () => {
    setTimeFormat(false);
});

themeToggle.addEventListener("click", toggleTheme);

/* ========================================
   7. INITIALIZE CLOCK
======================================== */

updateClock();
setInterval(updateClock, 1000);
