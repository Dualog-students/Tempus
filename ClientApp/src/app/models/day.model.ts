import { Hours } from '../models/hours.model';

export class Day {
  date: Date;
  weekDayEU?: WeekDay;
  weekDayUS?: WeekDay;
  hoursList?: Hours[];
}

export class WeekDay {
  name: string;
  day: number;
}
