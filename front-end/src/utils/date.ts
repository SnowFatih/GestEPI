import { format, parse, isValid } from 'date-fns';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import frLocale from 'date-fns/locale/fr';

export function getFormattedDateFromDate(date: Date): string {
  if (!isValid(date)) {
    throw new Error('La date fournie est invalide.');
  }

  if (isToday(date)) {
    return "Aujourd'hui";
  } else if (isYesterday(date)) {
    return 'Hier';
  }

  return format(date, 'dd MMMM yyyy', { locale: frLocale });
}

export function formatDateString(date: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "dd MMMM yyyy", { locale: frLocale });
}