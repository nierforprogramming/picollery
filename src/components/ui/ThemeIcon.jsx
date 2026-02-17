import React, { useEffect, useState } from "react";

const ThemeIcon = () => {
  const [themeToggle, setThemeToggle] = useState(false);

  const toggleTheme = () => {
    setThemeToggle((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      themeToggle ? "dark" : "light",
    );
  }, [themeToggle]);

  return (
    <div onClick={() => setThemeToggle((prev) => !prev)} className="theme-icon">
      {themeToggle ? "🌙" : "☀️"}
    </div>
  );
};

export default ThemeIcon;
