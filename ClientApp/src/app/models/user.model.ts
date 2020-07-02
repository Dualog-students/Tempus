import { Hours } from './hours.model';

export class User {
  _id: string;
  Name: string;
  Email: string;
  Position: string;
  IsAdmin?: boolean;
  Hours: Hours[];
  PartTimePercentage: number;
}
