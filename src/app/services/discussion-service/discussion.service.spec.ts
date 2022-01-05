/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscussionService } from './discussion.service';

describe('Service: Discussion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscussionService]
    });
  });

  it('should ...', inject([DiscussionService], (service: DiscussionService) => {
    expect(service).toBeTruthy();
  }));
});
