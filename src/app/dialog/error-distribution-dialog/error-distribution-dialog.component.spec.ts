import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDistributionDialogComponent } from './error-distribution-dialog.component';

describe('ErrorDistributionDialogComponent', () => {
  let component: ErrorDistributionDialogComponent;
  let fixture: ComponentFixture<ErrorDistributionDialogComponent>;

  beforeEach(async(() => {
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
