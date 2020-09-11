import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticesDistributionComponent } from './practices-distribution.component';

describe('ErrorDistributionComponent', () => {
  let component: PracticesDistributionComponent;
  let fixture: ComponentFixture<PracticesDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticesDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticesDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
