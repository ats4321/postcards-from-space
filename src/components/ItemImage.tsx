import { useEffect, useRef, useState } from 'react';
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
  const imageRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const src = shouldLoad ? sources[failed] : undefined;

  // Native lazy loading has a generous preload distance. Stamp grids can then
  // pull in the whole collection on a phone, so only attach a URL on entry.
  useEffect(() => {
    if (!lazy || shouldLoad) return;
    const node = imageRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  if (sources.length === 0) {
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
      ref={imageRef}
      className={className}
      src={src}
      alt={alt}
      width={image?.width ?? 480}
      height={image?.height ?? 320}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      onError={() => setFailed(failed + 1)}
    />
  );
}
