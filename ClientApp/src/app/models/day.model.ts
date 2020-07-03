import { Hours } from '../models/hours.model';

export class Day {
  date: number;
  weekDayEU?: WeekDay;
  weekDayUS?: WeekDay;
  hoursList?: Hours[];
}

export class WeekDay {
  name: string;
  day: number;
}
