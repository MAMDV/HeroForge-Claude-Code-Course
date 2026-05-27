import { useMemo } from 'react';

/**
 * DailyPattern -- generates a unique SVG geometric pattern seeded by today's date.
 * Luxury minimal version with warm gold tones.
 */

function seededRandom(seed) {
  let s = seed;
  return function next() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function dateSeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function DailyPattern({ width = 300, height = 300, className = '' }) {
  const svg = useMemo(() => {
    const rng = seededRandom(dateSeed());

    const shapes = [];
    const accentHue = 43; // Gold

    for (let i = 0; i < 8; i++) {
      const x = rng() * width;
      const y = rng() * height;
      const type = Math.floor(rng() * 3);
      const opacity = 0.02 + rng() * 0.04;
      const size = 30 + rng() * 80;
      const hue = accentHue + (rng() - 0.5) * 20;
      const color = `hsla(${hue}, 40%, 55%, ${opacity})`;

      if (type === 0) {
        shapes.push(
          `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="none" stroke="${color}" stroke-width="0.5" />`
        );
      } else if (type === 1) {
        const x2 = x + (rng() - 0.5) * 120;
        const y2 = y + (rng() - 0.5) * 120;
        shapes.push(
          `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="0.5" />`
        );
      } else {
        const pts = [
          `${x},${y - size / 2}`,
          `${x - size / 2},${y + size / 2}`,
          `${x + size / 2},${y + size / 2}`,
        ].join(' ');
        shapes.push(
          `<polygon points="${pts}" fill="none" stroke="${color}" stroke-width="0.5" />`
        );
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      ${shapes.join('\n      ')}
    </svg>`;
  }, [width, height]);

  const dataUri = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    [svg]
  );

  return (
    <img
      src={dataUri}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width, height }}
    />
  );
}

export default DailyPattern;
