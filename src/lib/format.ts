const KM_PER_MILE = 1.609344;

function compact(value: number, language: string): string {
  return new Intl.NumberFormat(language, {
    notation: 'compact',
    compactDisplay: 'long',
    maximumSignificantDigits: 3,
  }).format(value);
}

/** Miles first, then km, as the voice rules ask: "140 million miles (225 million km)". */
export function formatDistance(km: number, language: string): string {
  const unit = language === 'es' ? 'millas' : 'miles';
  return `${compact(km / KM_PER_MILE, language)} ${unit} (${compact(km, language)} km)`;
}

/** "2008-05-25" becomes "May 25, 2008" (or the Spanish form). */
export function formatDate(isoDate: string, language: string): string {
  return new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}
