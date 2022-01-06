/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvatarService } from './avatar.service';

describe('Service: Avatar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvatarService]
    });
  });

  it('should ...', inject([AvatarService], (service: AvatarService) => {
    expect(service).toBeTruthy();
  }));
});
