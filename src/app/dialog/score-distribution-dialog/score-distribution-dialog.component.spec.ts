import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScoreDistributionDialogComponent } from './score-distribution-dialog.component';

describe('ScoreDistributionDialogComponent', () => {
  let component: ScoreDistributionDialogComponent;
  let fixture: ComponentFixture<ScoreDistributionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDistributionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDistributionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
