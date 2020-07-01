import { TestBed } from '@angular/core/testing';

import { DeleteHoursService } from './delete-hours.service';

describe('DeleteHoursService', () => {
  let service: DeleteHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
