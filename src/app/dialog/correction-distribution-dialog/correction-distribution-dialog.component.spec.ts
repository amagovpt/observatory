import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionDistributionDialogComponent } from './correction-distribution-dialog.component';

describe('CorrectionDistributionDialogComponent', () => {
  let component: CorrectionDistributionDialogComponent;
  let fixture: ComponentFixture<CorrectionDistributionDialogComponent>;

  beforeEach(async(() => {
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
