import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorDistributionDialogComponent } from './error-distribution-dialog.component';

describe('ErrorDistributionDialogComponent', () => {
  let component: ErrorDistributionDialogComponent;
  let fixture: ComponentFixture<ErrorDistributionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDistributionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDistributionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
