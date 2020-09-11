import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticesDetailsComponent } from './practices-details.component';

describe('PracticesDetailsComponent', () => {
  let component: PracticesDetailsComponent;
  let fixture: ComponentFixture<PracticesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
