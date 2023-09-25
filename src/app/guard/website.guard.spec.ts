import { TestBed } from '@angular/core/testing';

import { WebsiteGuard } from './website.guard';

describe('WebsiteGuard', () => {
  let guard: WebsiteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WebsiteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
