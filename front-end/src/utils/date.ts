import { format } from 'date-fns';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import frLocale from 'date-fns/locale/fr';

export function getFormattedDate(date: Date): string {
  if (isToday(date)) {
    return "Aujourd'hui";
  } else if (isYesterday(date)) {
    return 'Hier';
  }

  return format(date, 'dd MMMM yyyy', { locale: frLocale });
}
