import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDistributionComponent } from './error-distribution.component';

describe('ErrorDistributionComponent', () => {
  let component: ErrorDistributionComponent;
  let fixture: ComponentFixture<ErrorDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
