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
