import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsTopFiveComponent } from './tags-top-five.component';

describe('TagsTopFiveComponent', () => {
  let component: TagsTopFiveComponent;
  let fixture: ComponentFixture<TagsTopFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsTopFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsTopFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
