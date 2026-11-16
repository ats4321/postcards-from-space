const KM_PER_MILE = 1.609344;

function compact(value: number, language: string): string {
  // es-MX: Arizona readers expect "16.1", not Spain's "16,1".
  return new Intl.NumberFormat(language === 'es' ? 'es-MX' : language, {
    notation: 'compact',
    compactDisplay: 'long',
    maximumSignificantDigits: 3,
  }).format(value);
}

/** Spanish needs "de" after millón/millones ("140 millones de millas") but not after "mil" ("384 mil km"). */
function withUnit(amount: string, unit: string, language: string): string {
  return language === 'es' && /(millón|millones)$/.test(amount) ? `${amount} de ${unit}` : `${amount} ${unit}`;
}

/** Miles first, then km, as the voice rules ask: "140 million miles (225 million km)". */
export function formatDistance(km: number, language: string): string {
  const unit = language === 'es' ? 'millas' : 'miles';
  return `${withUnit(compact(km / KM_PER_MILE, language), unit, language)} (${withUnit(compact(km, language), 'km', language)})`;
}

/** "2008-05-25" becomes "May 25, 2008" (or the Spanish form). */
export function formatDate(isoDate: string, language: string): string {
  return new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

/** Speed of light in km/s (exact, by definition of the metre). */
export const LIGHT_KM_PER_S = 299_792.458;

/**
 * How long a radio message takes to cover `km`: "1.3 seconds", "12.5 minutes",
 * "about 20 hours", "about 1 day". `about` is the translated "about {time}".
 */
export function formatLightTime(km: number, language: string, about = '{time}'): string {
  const seconds = km / LIGHT_KM_PER_S;
  const [value, unit, digits] =
    seconds < 60
      ? [seconds, 'second', 1]
      : seconds < 3600
        ? [seconds / 60, 'minute', 1]
        : Math.round(seconds / 3600) < 24 // Voyager 1 sits a hair under 86,400 s; call 23.5 h+ "about 1 day"
          ? [seconds / 3600, 'hour', 0]
          : [seconds / 86_400, 'day', 0];
  const time = new Intl.NumberFormat(language === 'es' ? 'es-MX' : language, {
    style: 'unit',
    unit,
    unitDisplay: 'long',
    maximumFractionDigits: digits,
  }).format(value);
  return digits === 0 ? about.replace('{time}', time) : time;
}
