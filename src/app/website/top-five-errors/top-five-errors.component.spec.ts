import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveErrorsComponent } from './top-five-errors.component';

describe('TopFiveErrorsComponent', () => {
  let component: TopFiveErrorsComponent;
  let fixture: ComponentFixture<TopFiveErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiveErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
