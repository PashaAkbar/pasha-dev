// Generates a 2D canvas with world continent silhouettes
// Can be sampled to determine whether (lat, lon) is Land or Ocean.

export function createWorldLandCanvas(width = 2048, height = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) return null;

  // Background: Ocean (black)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Foreground: Land (white)
  ctx.fillStyle = '#ffffff';

  // Helper to convert [lon, lat] (-180..180, -90..90) to (x, y) on equirectangular projection
  const toXY = (lon, lat) => {
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return [x, y];
  };

  const drawPolygon = (coords) => {
    if (coords.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = toXY(coords[0][0], coords[0][1]);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < coords.length; i++) {
      const [px, py] = toXY(coords[i][0], coords[i][1]);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Simplified continent polygons
  // North America
  drawPolygon([
    [-168, 65], [-160, 71], [-140, 70], [-125, 75], [-90, 70], [-80, 62],
    [-65, 60], [-55, 48], [-65, 44], [-75, 35], [-80, 25], [-82, 23],
    [-90, 30], [-97, 26], [-96, 18], [-85, 13], [-80, 9], [-77, 8],
    [-83, 10], [-90, 14], [-105, 20], [-110, 30], [-120, 34], [-124, 48],
    [-130, 54], [-140, 60], [-165, 60], [-168, 65]
  ]);

  // Alaska & Canada northern islands
  drawPolygon([[-168, 65], [-160, 56], [-150, 60], [-140, 60], [-145, 68], [-165, 68]]);
  // Greenland
  drawPolygon([[-50, 60], [-40, 60], [-20, 70], [-20, 82], [-40, 83], [-55, 76], [-50, 60]]);

  // South America
  drawPolygon([
    [-77, 8], [-72, 11], [-60, 10], [-50, 0], [-35, -5], [-35, -10],
    [-38, -14], [-40, -22], [-48, -28], [-55, -34], [-65, -45], [-68, -54],
    [-75, -50], [-73, -40], [-72, -30], [-76, -18], [-80, -5], [-81, 0],
    [-77, 8]
  ]);

  // Europe
  drawPolygon([
    [-10, 36], [-8, 43], [0, 43], [-5, 48], [2, 51], [8, 54],
    [5, 58], [5, 62], [10, 60], [15, 56], [12, 54], [20, 55],
    [30, 60], [35, 70], [25, 71], [15, 68], [5, 62], [0, 50],
    [-4, 44], [-9, 38], [-10, 36]
  ]);

  // Scandinavia
  drawPolygon([[5, 58], [12, 56], [22, 60], [30, 70], [25, 71], [18, 69], [10, 64], [5, 58]]);
  // United Kingdom & Ireland
  drawPolygon([[-10, 51], [-6, 50], [-2, 52], [-1, 54], [-2, 58], [-5, 59], [-6, 55], [-10, 51]]);
  drawPolygon([[-10.5, 51.5], [-6, 53], [-6, 55], [-10, 54], [-10.5, 51.5]]);

  // Africa
  drawPolygon([
    [-17, 15], [-15, 20], [-10, 28], [-5, 35], [10, 37], [25, 32],
    [32, 31], [35, 25], [43, 12], [51, 12], [45, 2], [40, -5],
    [35, -15], [32, -28], [28, -33], [18, -34], [15, -28], [12, -18],
    [10, -5], [2, 5], [-5, 5], [-12, 5], [-17, 15]
  ]);

  // Madagascar
  drawPolygon([[44, -12], [50, -14], [47, -25], [44, -25], [44, -12]]);

  // Asia / Eurasia
  drawPolygon([
    [30, 60], [40, 65], [60, 70], [80, 73], [100, 75], [120, 74],
    [140, 72], [170, 66], [175, 60], [160, 55], [150, 60], [140, 55],
    [130, 45], [122, 38], [120, 30], [110, 20], [105, 10], [100, 15],
    [90, 22], [80, 15], [75, 10], [72, 20], [68, 25], [60, 25],
    [50, 30], [45, 40], [35, 42], [30, 60]
  ]);

  // Arabian Peninsula
  drawPolygon([[35, 30], [45, 30], [55, 25], [60, 22], [55, 15], [45, 12], [40, 15], [35, 25], [35, 30]]);

  // Indian Subcontinent
  drawPolygon([[68, 24], [72, 19], [77, 8], [80, 13], [88, 22], [80, 26], [68, 24]]);

  // Southeast Asia & Islands
  drawPolygon([[98, 10], [105, 10], [108, 15], [102, 20], [98, 10]]);
  drawPolygon([[95, 5], [105, -5], [108, -7], [98, -3], [95, 5]]); // Sumatra / Java
  drawPolygon([[110, 4], [118, 5], [115, -3], [109, 0], [110, 4]]); // Borneo

  // Japan
  drawPolygon([[130, 32], [136, 35], [141, 42], [145, 44], [140, 37], [132, 32], [130, 32]]);

  // Australia & New Zealand
  drawPolygon([
    [114, -22], [120, -15], [135, -12], [142, -11], [148, -20],
    [153, -28], [150, -36], [140, -38], [130, -32], [116, -34],
    [114, -26], [114, -22]
  ]);
  // Tasmania
  drawPolygon([[145, -41], [148, -41], [147, -44], [144, -43], [145, -41]]);
  // New Zealand
  drawPolygon([[167, -46], [174, -41], [178, -38], [174, -36], [172, -41], [167, -46]]);

  // Antarctica
  drawPolygon([
    [-180, -78], [-120, -75], [-60, -65], [-30, -70], [0, -70],
    [60, -65], [120, -65], [180, -78], [180, -90], [-180, -90]
  ]);

  return canvas;
}
