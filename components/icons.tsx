export function IconUnkown({ width, height, className }: { width?: string, height?: string, className?: string }) {
  width ??= '200';
  height ??= '200';

  return (
    <svg width={width} height={height} className={className}>
      <rect width={width} height={height} fill="rgb(57, 59, 64)" strokeWidth="3" stroke="rgb(0,0,0)" />
    </svg>
  );
}