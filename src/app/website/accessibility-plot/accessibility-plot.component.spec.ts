import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityPlotComponent } from './accessibility-plot.component';

describe('AccessibilityPlotComponent', () => {
  let component: AccessibilityPlotComponent;
  let fixture: ComponentFixture<AccessibilityPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessibilityPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilityPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
