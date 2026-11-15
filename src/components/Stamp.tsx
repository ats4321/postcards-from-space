import { getImage, type Item } from '../content';
import { ItemImage } from './ItemImage';

type Props = {
  item: Item;
  /** row: hardware list. slot: Passport and quiz. card: on the postcard. Sizes live in postcard.css. */
  size?: 'row' | 'slot' | 'card';
  /** Earned stamps get a red cancellation mark. */
  cancelled?: boolean;
  className?: string;
};

/**
 * A perforated stamp. Always decorative: the name next to it carries the meaning,
 * so the picture inside has empty alt text and the whole stamp is hidden from
 * screen readers. The perforation maths is in postcard.css (.stamp-paper).
 */
export function Stamp({ item, size = 'slot', cancelled = false, className = '' }: Props) {
  return (
    <span className={`stamp stamp--${size} ${className}`} aria-hidden="true">
      <span className="stamp-paper">
        <ItemImage
          className="stamp-image"
          image={getImage(item.imageId)}
          fallback={`/img/illustrations/${item.illustration}.svg`}
          alt=""
          lazy
        />
        <span className="stamp-year">{item.launchDate.slice(0, 4)}</span>
      </span>
      {cancelled && (
        <svg className="stamp-cancel" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" />
          <circle cx="20" cy="20" r="12" />
          <path d="M13 20.5l5 5 9-10" />
        </svg>
      )}
    </span>
  );
}
