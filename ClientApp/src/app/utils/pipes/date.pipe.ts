import { Pipe, PipeTransform } from '@angular/core';

import { WeekDay } from '../../models/day.model';

export const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Convert date to EU WeekDay object
@Pipe({
  name: 'date2WeekDayEU',
})
export class Date2WeekDayEU implements PipeTransform {
  transform(date: number): WeekDay {
    const day = modulo(new Date(date).getDay() - 1, 7);
    return { name: WEEKDAYS[day], day };
  }
}

// Convert date to US WeekDay object
@Pipe({
  name: 'date2WeekDayUS',
})
export class Date2WeekDayUS implements PipeTransform {
  transform(date: number): WeekDay {
    const day = modulo(new Date(date).getDay(), 7);
    return { name: WEEKDAYS[day], day };
  }
}

// Convert date to EU string
@Pipe({
  name: 'date2String',
})
export class Date2String implements PipeTransform {
  transform(dateNumber: number): string {
    const date = new Date(dateNumber);
    const day = zeroPad(date.getDate());
    const month = zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export function zeroPad(n: number): string {
  return (n < 10 ? '0' + n : n).toString();
}

function modulo(a: number, b: number): number {
  return ((a % b) + b) % b;
}
