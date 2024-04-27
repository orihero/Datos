import {eachDayOfInterval, format} from 'date-fns';
export const DAY = 1 * 24 * 60 * 60 * 1000;
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTH_WITH_YEAR = 'MMMM, yyyy';
export const US_DATE_TIME_FORMAT = 'MMM d, yyyy, hh:mm a';
export const MM_DD_YYYY = 'MMM dd, yyyy';

export const ISOToDate = (itc: string) => {
  const converted = new Date(itc);
  return converted;
};

export const dateToISO = (date: Date) => date.toISOString();

export function getFirstDayOfTheWeek(date: Date): Date {
  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  const currentDay = (currentDate.getDay() - 1 + 7) % 7;

  return new Date(currentDate.getTime() - currentDay * DAY);
}

export function getLastDayOfTheWeek(date: Date): Date {
  const firstDay = getFirstDayOfTheWeek(date);

  return new Date(firstDay.getTime() + DAY * 6);
}

export function genDaysOfTheWeek(date: Date): Date[] {
  const firstDay = getFirstDayOfTheWeek(date); // Mon
  const lastDay = getLastDayOfTheWeek(date); // Sun

  return eachDayOfInterval(
    {
      start: firstDay,
      end: lastDay,
    },
    {step: 1},
  );
}

export function convertToStandardFormat(date: string | number | Date): string {
  return format(date, US_DATE_TIME_FORMAT);
}

export function convertToShortDate(date: string | number | Date): string {
  return format(date, MM_DD_YYYY);
}
