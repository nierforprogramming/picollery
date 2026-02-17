import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [themeToggle, setThemeToggle] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    // Apply theme to HTML
    document.documentElement.setAttribute(
      "data-theme",
      themeToggle ? "dark" : "light",
    );

    // Save preference
    localStorage.setItem("theme", themeToggle ? "dark" : "light");
  }, [themeToggle]);

  return (
    <div onClick={() => setThemeToggle((prev) => !prev)}>
      {themeToggle ? "🌙" : "☀️"}
    </div>
  );
};

export default ThemeToggle;
