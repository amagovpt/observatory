import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreePracticesComponent } from './top-three-practices.component';

describe('TopThreePracticesComponent', () => {
  let component: TopThreePracticesComponent;
  let fixture: ComponentFixture<TopThreePracticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopThreePracticesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopThreePracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
