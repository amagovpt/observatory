import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllErrorsListComponent } from './all-errors-list.component';

describe('AllErrorsListComponent', () => {
  let component: AllErrorsListComponent;
  let fixture: ComponentFixture<AllErrorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllErrorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllErrorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
