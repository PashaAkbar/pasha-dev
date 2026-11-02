import React from 'react';

// Minimalist sci-fi cyber engineer dot character (Pure vector dots, zero background)
export default function DotCharacter({ width = 160, height = 200 }) {
  // 24 columns x 28 rows dot matrix defining an iconic astronaut / cyber developer silhouette
  const grid = [
    // Headset / antenna beacon
    [12, 1], [12, 2], [13, 2],
    // Helmet top curve
    [10, 4], [11, 4], [12, 4], [13, 4], [14, 4],
    [8, 5], [9, 5], [15, 5], [16, 5],
    [7, 6], [17, 6],
    [6, 7], [18, 7],
    // Visor line (dense bright dots)
    [6, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [18, 8],
    [6, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [18, 9],
    [6, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [18, 10],
    // Helmet bottom / jaw
    [7, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [17, 11],
    [8, 12], [11, 12], [12, 12], [13, 12], [16, 12],
    // Collar / Neck
    [10, 13], [11, 13], [12, 13], [13, 13], [14, 13],
    [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
    // Shoulders
    [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [14, 15], [15, 15], [16, 15], [17, 15], [18, 15],
    [4, 16], [5, 16], [6, 16], [7, 16], [8, 16], [11, 16], [12, 16], [13, 16], [16, 16], [17, 16], [18, 16], [19, 16], [20, 16],
    [3, 17], [4, 17], [5, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [19, 17], [20, 17], [21, 17],
    // Chest & Core Unit
    [3, 18], [4, 18], [9, 18], [11, 18], [12, 18], [13, 18], [15, 18], [20, 18], [21, 18],
    [3, 19], [4, 19], [8, 19], [11, 19], [12, 19], [13, 19], [16, 19], [20, 19], [21, 19],
    [3, 20], [4, 20], [8, 20], [10, 20], [14, 20], [16, 20], [20, 20], [21, 20],
    // Arms & Waist
    [3, 21], [4, 21], [8, 21], [9, 21], [10, 21], [11, 21], [12, 21], [13, 21], [14, 21], [15, 21], [16, 21], [20, 21], [21, 21],
    [4, 22], [5, 22], [9, 22], [10, 22], [11, 22], [12, 22], [13, 22], [14, 22], [15, 22], [19, 22], [20, 22],
    [5, 23], [9, 23], [10, 23], [11, 23], [12, 23], [13, 23], [14, 23], [15, 23], [19, 23],
    // Lower Torso / Belt
    [10, 24], [11, 24], [12, 24], [13, 24], [14, 24],
    [9, 25], [10, 25], [12, 25], [14, 25], [15, 25],
    [9, 26], [10, 26], [14, 26], [15, 26],
    // Ambient floating orbital dots around character
    [1, 8], [2, 13], [22, 9], [23, 14], [1, 22], [23, 23], [12, 28]
  ];

  const cols = 25;
  const rows = 29;
  const stepX = width / cols;
  const stepY = height / rows;

  return (
    <div
      style={{
        width,
        height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'visible', background: 'transparent' }}
      >
        {grid.map(([col, row], i) => {
          const cx = col * stepX;
          const cy = row * stepY;

          // Highlights on visor and antenna beacon
          const isVisor = (row === 8 || row === 9 || row === 10) && col >= 8 && col <= 16;
          const isAntenna = row <= 2;
          const isCore = row >= 16 && row <= 19 && col >= 11 && col <= 13;

          let r = 2.2;
          let fill = '#888888';
          let opacity = 0.65;

          if (isVisor) {
            r = 2.7;
            fill = '#ffffff';
            opacity = 0.95;
          } else if (isAntenna || isCore) {
            r = 2.5;
            fill = '#ffffff';
            opacity = 0.9;
          } else if (col === 1 || col === 2 || col === 22 || col === 23) {
            // Ambient faint dots
            r = 1.4;
            fill = '#555555';
            opacity = 0.35;
          }

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={fill}
              opacity={opacity}
            />
          );
        })}
      </svg>
    </div>
  );
}
