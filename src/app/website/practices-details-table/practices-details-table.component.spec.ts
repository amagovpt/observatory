import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PracticesDetailsTableComponent } from './practices-details-table.component';

describe('PracticesDetailsTableComponent', () => {
  let component: PracticesDetailsTableComponent;
  let fixture: ComponentFixture<PracticesDetailsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticesDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticesDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
