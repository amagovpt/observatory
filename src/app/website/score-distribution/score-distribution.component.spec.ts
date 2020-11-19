import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScoreDistributionComponent } from './score-distribution.component';

describe('ScoreDistributionComponent', () => {
  let component: ScoreDistributionComponent;
  let fixture: ComponentFixture<ScoreDistributionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
