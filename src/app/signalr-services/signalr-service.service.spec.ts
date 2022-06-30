/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignalrService } from './signalr-service.service';

describe('Service: SignalrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalrService]
    });
  });

  it('should ...', inject([SignalrService], (service: SignalrService) => {
    expect(service).toBeTruthy();
  }));
});
