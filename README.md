# 🖼️ Picollery - An Image Gallery App

A simple image gallery application for beautiful images.

### 🚀 Features

- 🖼️ Responsive image grid layout
- ⚡ Fast loading images from API
- 🎨 Clean and modern UI

### 🛠️ Tech Stack

- Frontend: React
- API: Lorem Picsum
- Styling: Vanilla CSS
- Build tool: Vite

### 🌱 Future Enhancements

- ⬇️ Download images
- 🔍 Image preview modal

📄 License
This project is licensed under the MIT License.

👤 Author
Name: Niraj

GitHub: https://github.com/nierforprogramming

### Personal Notes

Will remove soon

#### API Call

```js
export const getRandomImage = async (count) => {
  try {
    const images = [];
    for (let i = 0; i < count; i++) {
      images.push({
        id: i + 1,
        url: `https://picsum.photos/800/600?random=${Math.random()}`,
      });
    }

    return images;
  } catch (error) {
    return error.message;
  }
};
```

It takes a number called count.
count means: how many images?

`const images = [];`

Create an empty list.
This will store image objects.

`for (let i = 0; i < count; i++) {`
oop from 0 until you reach count.
Runs once for each image. Repeat until I have enough images.

`images.push({`
Add a new image object into the list.

`url: https://picsum.photos/800/600?random=${Math.random()}`

This is the important part. You create a random image link.
What happens here:

- 800/600 → image size
- Math.random() → generates a random number
- Adding ?random= prevents caching

Browser gets a different image every time.

```js
[
  { id: 1, url: "random image link" },
  { id: 2, url: "random image link" },
  ...
]
```

#### Placeholder logic

`const [images, setImages] = useState([]);`

The gallery starts with no images.

`const data = await getRandomImage(10);`

Gives 10 random image URLs.

```js
const imagesWithId = data.map((img, index) => ({
  ...img,
  id: index,
}));
```

Go through each image and attach a unique identifier. Label for each image so I can manage them.

```js
{
  images.map((image) => <ImageCard key={image.id} image={image} />);
}
```

For every image:
Create a card.
Now each card handles its own loading.

##### ImageCard

`const [loaded, setLoaded] = useState(false);`

Assume the image is NOT ready. Show placeholder first

`{!loaded && <ImageCardSkeleton />}`
If not loaded → show skeleton.

`onLoad={() => setLoaded(true)}`

When browser finishes downloading. Mark this image as ready.

`style={{ display: loaded ? "block" : "none" }}`
Hide image until ready. Prevents flicker.

#### 🌙 Dark Mode Toggle

This component allows users to switch between light mode and dark mode by:

Storing the theme state in React

- Updating an HTML attribute (data-theme)
  -Using CSS variables to change styles globally

```js
import React, { useEffect, useState } from "react";

const ThemeIcon = () => {
  const [themeToggle, setThemeToggle] = useState(false);

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
```

useState → stores whether dark mode is active
useEffect → runs side effects when theme changes

`const [themeToggle, setThemeToggle] = useState(false);`

themeToggle → boolean flag

false = light mode

true = dark mode

setThemeToggle → updates theme when user clicks button

```js
useEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    themeToggle ? "dark" : "light",
  );
}, [themeToggle]);
```

What happens:
Whenever dark changes:

- Access <html> element (document.documentElement)
- Set attribute:

```css
data-theme="dark"
or
data-theme="light"
```

This allows CSS to apply different styles.

Why this works
CSS can target attributes like:
`[data-theme="dark"]`

So the entire app updates automatically.

```js
<div onClick={() => setThemeToggle((prev) => !prev)} className="theme-icon">
  {themeToggle ? "🌙" : "☀️"}
</div>
```

Logic:

When clicked:

- Reads previous state
- Flips it (true → false, false → true)
- UI updates
- useEffect runs
- Theme changes globally

Label update

- Shows moon when dark mode is active
- Shows sun when light mode is active

CSS Logic

```css
:root {
  --bg-color: #ffffff;
  --text-color: #111111;
  --card-bg: #f5f5f5;
}
```

:root means default values.
These are used when no dark theme is applied.

Dark theme override

```css
[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #eeeeee;
  --card-bg: #1e1e1e;
}
```

When `<html data-theme="dark">` exists:
CSS variables are replaced.

Applying variables

```css
body {
  background: var(--bg-color);
  color: var(--text-color);
  transition:
    background 0.3s ease,
    color 0.3s ease;
}
```

This makes the UI react to variable changes. Adds smooth animation when switching themes.

##### 🏆 Tip

`localStorage.setItem("theme", themeToggle ? "dark" : "light");`

#### 🌙 Theme Persistence — Documentation

Read saved theme on initial render
The theme state uses lazy initialization to read from localStorage only once.

```js
const [themeToggle, setThemeToggle] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
});
```

This prevents unnecessary reads on every render.

Apply theme and persist changes
A useEffect runs whenever the theme changes.

```js
useEffect(() => {
  // Apply theme to HTML
  document.documentElement.setAttribute(
    "data-theme",
    themeToggle ? "dark" : "light",
  );

  // Save preference
  localStorage.setItem("theme", themeToggle ? "dark" : "light");
}, [themeToggle]);
```

This ensures:

- The UI updates immediately.
- The preference is stored.

Why Use localStorage?

- localStorage is ideal because:
- Data persists across reloads
- Works offline
- Simple key-value storage
- No backend required

Preventing Theme Flicker
Without early theme application, users may briefly see the wrong theme.
To prevent this, add a script in `<head>:`

```js
<script>
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);
</script>
```

Explanation:

- Reads the saved theme from localStorage.
- Defaults to "dark" if no theme is saved.
- Applies the data-theme attribute to `<html>` immediately, which CSS uses to style the page.

Make sure your CSS includes:

```css
html {
  background: var(--bg-color);
}
```

Browsers paint `<html>` first — not `<body>.`

React State Initialization

```js
const [themeToggle, setThemeToggle] = useState(() => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
});
```

Explanation:

Lazy state initialization:

- Reads the saved theme from localStorage only once when the component mounts.

Safety check:

- Wrapped in try/catch to avoid errors in environments where localStorage might not be available.

State value:

- true → dark mode
- false → light mode
