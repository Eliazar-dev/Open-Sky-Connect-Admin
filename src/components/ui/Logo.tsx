interface LogoProps {
  /** Width of the logo in pixels */
  width?: number;
  /** Height of the logo in pixels (auto-calculated based on aspect ratio if not provided) */
  height?: number;
  /** Show the "OpenSky Connect" wordmark next to the icon */
  showWordmark?: boolean;
  /** Render wordmark/icon in white (for dark backgrounds like the admin sidebar) */
  variant?: 'default' | 'light';
  className?: string;
}

/**
 * OpenSky Connect brand mark using Cloudinary hosted image.
 * Aspect ratio is approximately 3.33:1 (width:height)
 */
export function Logo({ width = 250, height, showWordmark = false, variant = 'default', className = '' }: LogoProps) {
  const inkColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const connectColor = variant === 'light' ? 'text-white/70' : 'text-slate-500';
  const logoHeight = height || Math.round(width / 3.33);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="https://res.cloudinary.com/gfiqfk7x/image/upload/v1786638225/ChatGPT_Image_Aug_13_2026_07_05_39_PM_xd3bfs.png"
        alt="OpenSky Connect"
        width={width}
        height={logoHeight}
        className="object-contain"
      />
      {showWordmark && (
        <span className="leading-none whitespace-nowrap">
          <span className={`font-bold ${inkColor}`} style={{ fontSize: width * 0.2 }}>
            OpenSky
          </span>{' '}
          <span className={`font-normal ${connectColor}`} style={{ fontSize: width * 0.2 }}>
            Connect
          </span>
        </span>
      )}
    </div>
  );
}
