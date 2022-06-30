/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpUsersService } from './http-service.service';

describe('Service: HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpUsersService]
    });
  });

  it('should ...', inject([HttpUsersService], (service: HttpUsersService) => {
    expect(service).toBeTruthy();
  }));
});
