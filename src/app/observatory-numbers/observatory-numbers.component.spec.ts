import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoryNumbersComponent } from './observatory-numbers.component';

describe('ObservatoryNumbersComponent', () => {
  let component: ObservatoryNumbersComponent;
  let fixture: ComponentFixture<ObservatoryNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservatoryNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
