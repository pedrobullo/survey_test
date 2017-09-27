export default function createThumb(dataImage) {
  if (!dataImage) return;

  const createCanvas = (img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const MAX_WIDTH = 100;
    const MAX_HEIGHT = 100;

    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);

    console.log(`Creating Thumbnail ${canvas.width} x ${canvas.height}`); // eslint-disable-line

    return canvas.toDataURL('image/png'); // return base64
  };

  return new Promise((resolve) => { // eslint-disable-line
    const img = new Image();

    img.onload = () => {
      resolve(createCanvas(img));
    };

    img.src = dataImage;
  });
}
