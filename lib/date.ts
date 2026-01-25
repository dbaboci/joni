export function formatPostDate(date: string, locale = "en-US") {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(d);
}
