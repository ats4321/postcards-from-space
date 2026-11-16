import type { LucideIcon } from 'lucide-react';

/** One consistent UI icon: 16 px, 1.75 px stroke, decorative (the label next to it carries the meaning). */
export function Icon({ as: As }: { as: LucideIcon }) {
  return <As className="icon" size={16} strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
