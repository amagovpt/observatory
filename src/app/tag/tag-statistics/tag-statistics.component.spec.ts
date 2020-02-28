import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatisticsComponent } from './tag-statistics.component';

describe('TagStatisticsComponent', () => {
  let component: TagStatisticsComponent;
  let fixture: ComponentFixture<TagStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
