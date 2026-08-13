interface LogoProps {
  /** Size of the icon mark in pixels */
  size?: number;
  /** Show the "OpenSky Connect" wordmark next to the icon */
  showWordmark?: boolean;
  /** Render wordmark/icon in white (for dark backgrounds like the admin sidebar) */
  variant?: 'default' | 'light';
  className?: string;
}

/**
 * OpenSky Connect brand mark using Cloudinary hosted image.
 */
export function Logo({ size = 120, showWordmark = false, variant = 'default', className = '' }: LogoProps) {
  const inkColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const connectColor = variant === 'light' ? 'text-white/70' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="https://res.cloudinary.com/gfiqfk7x/image/upload/v1786638225/ChatGPT_Image_Aug_13_2026_07_05_39_PM_xd3bfs.png"
        alt="OpenSky Connect Logo"
        width={size}
        height={size}
        className="object-contain"
      />
      {showWordmark && (
        <span className="leading-none whitespace-nowrap">
          <span className={`font-bold ${inkColor}`} style={{ fontSize: size * 0.62 }}>
            OpenSky
          </span>{' '}
          <span className={`font-normal ${connectColor}`} style={{ fontSize: size * 0.62 }}>
            Connect
          </span>
        </span>
      )}
    </div>
  );
}
