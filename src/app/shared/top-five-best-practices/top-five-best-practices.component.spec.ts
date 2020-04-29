import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveBestPracticesComponent } from './top-five-best-practices.component';

describe('TopFiveBestPracticesComponent', () => {
  let component: TopFiveBestPracticesComponent;
  let fixture: ComponentFixture<TopFiveBestPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiveBestPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
