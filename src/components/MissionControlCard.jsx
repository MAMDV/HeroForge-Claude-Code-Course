import { useEffect, useRef, useState } from 'react';

/**
 * MissionControlCard -- luxury stat card with animated counter and subtle lift on hover.
 */
function MissionControlCard({ label, count }) {
  const [displayCount, setDisplayCount] = useState(0);
  const cardRef = useRef(null);

  // Animated counter on mount
  useEffect(() => {
    if (count === 0) {
      setDisplayCount(0);
      return;
    }

    let frame;
    const duration = 800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(eased * count));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count]);

  return (
    <div
      ref={cardRef}
      className="mc-card flex h-full flex-col items-center justify-center p-6 text-center"
      role="group"
      aria-label={`${label}: ${count}`}
    >
      <p className="mc-data text-4xl">{displayCount}</p>
      <p className="lm-label mt-3">{label}</p>
    </div>
  );
}

export default MissionControlCard;
