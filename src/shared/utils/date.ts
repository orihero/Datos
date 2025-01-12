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

export function timeSince(createdAt: number) {
  const now = Date.now(); // Hozirgi vaqtni oling
  const diff = now - createdAt; // Millisekundlarda farq

  const seconds = diff / 1000; // Soniyalar
  const minutes = seconds / 60; // Daqiqalar
  const hours = minutes / 60; // Soatlar
  const days = hours / 24; // Kunlar
  const weeks = days / 7; // Haftalar
  const years = days / 365; // Yillar

  if (seconds < 1) {
    return '1 s ago'; // Hozir va yaratilgan vaqt teng bo'lsa
  }

  if (seconds < 60) {
    return `${Math.floor(seconds)} s ago`; // 1 daqiqadan kam bo'lsa
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} min ago`; // 1 soatdan kam bo'lsa
  } else if (hours < 24) {
    return `${Math.floor(hours)} h ago`; // 24 soatdan kam bo'lsa
  } else if (days <= 7) {
    return `${Math.floor(days)} d ago`; // 1 haftadan kam bo'lsa
  } else if (weeks < 52) {
    return `${Math.floor(weeks)} w ago`; // 1 yildan kam bo'lsa
  } else {
    return `${Math.floor(years)} y ago`; // 1 yildan katta bo'lsa
  }
}
