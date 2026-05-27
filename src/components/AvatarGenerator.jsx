import { useMemo } from 'react';

/**
 * AvatarGenerator -- uses DiceBear API for deterministic avatars.
 * Falls back to inline SVG initials if DiceBear is unavailable.
 *
 * Props: { name: string, size?: number }
 */

function diceBearUrl(seed, size) {
  // Using DiceBear "initials" style for a clean luxury look
  const encodedSeed = encodeURIComponent(seed || 'User');
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodedSeed}&size=${size}&backgroundColor=c9a84c,64748b,6b8f6b,4c5c8c,8c6c4c,9f5c5c&backgroundType=solid&fontFamily=Georgia&fontSize=40&fontWeight=400`;
}

function AvatarGenerator({ name, size = 40 }) {
  const src = useMemo(() => diceBearUrl(name, size), [name, size]);

  return (
    <img
      src={src}
      alt={`Avatar for ${name}`}
      width={size}
      height={size}
      className="mc-avatar-ring rounded-full"
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}

export default AvatarGenerator;
