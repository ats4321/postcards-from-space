import { useState } from 'react';
import type { Image } from '../content';

type Props = {
  image?: Image;
  /** Tried when the image is missing or fails to load, e.g. the item's drawn placeholder. */
  fallback?: string;
  /** Pass "" for a decorative copy of a picture that is described elsewhere. */
  alt: string;
  className?: string;
  lazy?: boolean;
};

/** A picture that steps down to the placeholder drawing, then to a plain block, if files are missing. */
export function ItemImage({ image, fallback, alt, className = '', lazy = false }: Props) {
  const sources = [...new Set([image?.file, fallback])].filter((src): src is string => !!src);
  const [failed, setFailed] = useState(0);
  const src = sources[failed];

  if (!src) {
    return (
      <span
        className={`img-missing ${className}`}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
      />
    );
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={480}
      height={320}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      onError={() => setFailed(failed + 1)}
    />
  );
}
