import { TestBed } from '@angular/core/testing';

import { DirectoryGuard } from './directory.guard';

describe('DirectoryGuard', () => {
  let guard: DirectoryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirectoryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
