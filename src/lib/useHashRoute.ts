import { useEffect, useState } from 'react';

function readHash(): string {
  return decodeURIComponent(window.location.hash.replace(/^#\/?/, ''));
}

/** The current URL hash without the "#", so /#phoenix gives "phoenix". */
export function useHashRoute(): string {
  const [route, setRoute] = useState(readHash);

  useEffect(() => {
    const onChange = () => setRoute(readHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
