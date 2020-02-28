import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsStatisticsComponent } from './tags-statistics.component';

describe('TagsStatisticsComponent', () => {
  let component: TagsStatisticsComponent;
  let fixture: ComponentFixture<TagsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
