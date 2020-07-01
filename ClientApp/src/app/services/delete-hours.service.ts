import { Injectable } from '@angular/core';
import { BaseApiService, ApiOptions } from './api/base-api.service';
import { RegisterUser } from '../models/registerUser.model';
import { User } from '../models/user.model';
import { Hours } from '../models/hours.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteHoursService extends BaseApiService {
  constructor(protected apiOptions: ApiOptions) {
    super(apiOptions);
  }

  deleteHours = (id: string, hours: Hours): Promise<string> =>
    super.post<string>(id + '/delete-hours', hours);
}
