import { Injectable } from '@angular/core';
import { BaseApiService, ApiOptions } from './api/base-api.service';
import { Hours } from '../models/hours.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteHoursService extends BaseApiService {
  constructor(protected apiOptions: ApiOptions) {
    super(apiOptions);
  }
}
