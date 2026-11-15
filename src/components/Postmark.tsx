import { useId } from 'react';

type Props = { top: string; date: string; year: string };

/** A restrained round postmark with three wavy cancel lines. Decorative. */
export function Postmark({ top, date, year }: Props) {
  const arc = useId();
  return (
    <svg className="postmark" viewBox="0 0 152 96" aria-hidden="true">
      <defs>
        <path id={arc} d="M14 48a34 34 0 0 1 68 0" />
      </defs>
      <circle cx="48" cy="48" r="44" />
      <circle cx="48" cy="48" r="27" />
      <text className="postmark-arc" textAnchor="middle">
        <textPath href={`#${arc}`} startOffset="50%">
          {top.toUpperCase()}
        </textPath>
      </text>
      <text x="48" y="46" textAnchor="middle">
        {date.toUpperCase()}
      </text>
      <text x="48" y="60" textAnchor="middle">
        {year}
      </text>
      <path d="M94 30q7-6 14 0t14 0 14 0 14 0M94 48q7-6 14 0t14 0 14 0 14 0M94 66q7-6 14 0t14 0 14 0 14 0" />
    </svg>
  );
}
