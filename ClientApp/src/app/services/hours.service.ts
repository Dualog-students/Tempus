import { Injectable } from '@angular/core';

import { UserProviderService } from '../services/api/user-provider.service';
import { Hours } from '../models/hours.model';

@Injectable({
  providedIn: 'root',
})
export class HoursService {
  constructor(private userProvider: UserProviderService) {}

  async registerHours(id: string, hours: Hours) {
    hours.Hours = Math.round(hours.Hours * 100);
    return this.userProvider
      .registerHours(id, hours)
      .then(async (response: string) => {
        if (typeof response === 'string') {
          return true;
        }
        return false;
      });
  }

  async deleteHours(id: string, hours: Hours) {
    hours.Hours = Math.round(hours.Hours * 100);
    return this.userProvider
      .deleteHours(id, hours)
      .then(async (response: string) => {
        if (typeof response === 'string') {
          return true;
        }
        return false;
      });
  }
}
