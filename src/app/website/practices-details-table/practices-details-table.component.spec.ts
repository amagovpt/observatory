import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticesDetailsTableComponent } from './practices-details-table.component';

describe('PracticesDetailsTableComponent', () => {
  let component: PracticesDetailsTableComponent;
  let fixture: ComponentFixture<PracticesDetailsTableComponent>;

  beforeEach(async(() => {
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
