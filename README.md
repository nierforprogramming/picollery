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
