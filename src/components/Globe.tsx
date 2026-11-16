export type GlobeKind = 'earth' | 'moon' | 'mars' | 'asteroids' | 'sun';

/** Simple drawn globes in the project palette, shared by the Map, the Timeline and the Journey scenes. Decorative. */
export function Globe({ kind, x, y, r }: { kind: GlobeKind; x: number; y: number; r: number }) {
  if (kind === 'asteroids') {
    // Three small grey rocks, scaled to the radius.
    const rock = (dx: number, dy: number, s: number) =>
      `M${x + dx - s} ${y + dy} L${x + dx - s * 0.3} ${y + dy - s} L${x + dx + s} ${y + dy - s * 0.4} L${x + dx + s * 0.6} ${y + dy + s * 0.8} L${x + dx - s * 0.5} ${y + dy + s * 0.9} Z`;
    return (
      <g className="globe globe--asteroids" aria-hidden="true">
        <path d={rock(-r * 0.5, r * 0.2, r * 0.45)} />
        <path d={rock(r * 0.45, -r * 0.35, r * 0.35)} />
        <path d={rock(r * 0.4, r * 0.55, r * 0.28)} />
      </g>
    );
  }
  return (
    <g className={`globe globe--${kind}`} aria-hidden="true">
      <circle cx={x} cy={y} r={r} />
      {kind === 'moon' && (
        <>
          <circle className="globe-crater" cx={x - r * 0.3} cy={y - r * 0.25} r={r * 0.28} />
          <circle className="globe-crater" cx={x + r * 0.35} cy={y + r * 0.3} r={r * 0.18} />
        </>
      )}
    </g>
  );
}
