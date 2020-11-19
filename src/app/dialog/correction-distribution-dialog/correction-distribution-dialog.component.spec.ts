import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorrectionDistributionDialogComponent } from './correction-distribution-dialog.component';

describe('CorrectionDistributionDialogComponent', () => {
  let component: CorrectionDistributionDialogComponent;
  let fixture: ComponentFixture<CorrectionDistributionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionDistributionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionDistributionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
