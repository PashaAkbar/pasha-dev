// Earth landmask sampler using the high-resolution NASA specular map
// Land has brightness > 40, Oceans have brightness < 30.

let cachedMapData = null;
let loadPromise = null;

export function loadEarthLandMask(url) {
  const finalUrl = url || ((import.meta.env.BASE_URL || '/') + 'earth-specular.jpg');
  if (cachedMapData) {
    return Promise.resolve(cachedMapData);
  }
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = finalUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        cachedMapData = {
          width: img.width,
          height: img.height,
          data: imgData.data,
        };
        resolve(cachedMapData);
      } catch (err) {
        console.warn('Could not read image data, falling back to procedural:', err);
        resolve(null);
      }
    };

    img.onerror = () => {
      console.warn('Failed to load earth specular texture, fallback to procedural');
      resolve(null);
    };
  });

  return loadPromise;
}

export function isLandAt(u, v, mapData) {
  if (!mapData || !mapData.data) {
    return false;
  }
  // u: 0..1 (longitude), v: 0..1 (latitude from top to bottom)
  const px = Math.min(mapData.width - 1, Math.max(0, Math.floor(u * mapData.width)));
  const py = Math.min(mapData.height - 1, Math.max(0, Math.floor(v * mapData.height)));
  const index = (py * mapData.width + px) * 4;
  // In the NASA specular map water reflects light (bright) and land is dark,
  // so land = dark pixels, ocean = bright pixels.
  return mapData.data[index] < 38;
}
