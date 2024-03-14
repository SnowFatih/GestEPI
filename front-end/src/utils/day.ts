import dayjs from 'dayjs';

export const formatDate = (date?: Date): string => {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD');
  }
  return '';
};

export function formatDateISO(date?: Date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

export const formatDateMonthAndYear = (date?: Date): string => {
  if (date) {
    return dayjs(date).format('D MMMM YYYY');
  }
  return '';
};

export const getSelectedYears = (value: number): any => {
  const selectedYears = [
    {
      id: 0,
      value: 'Année'
    }
  ];
  const yearOfMoment = dayjs().get('year');
  for (let index = 0; value + index <= yearOfMoment; index++) {
    selectedYears.push({
      id: index + 1,
      value: (yearOfMoment - index).toString()
    });
  }
};
