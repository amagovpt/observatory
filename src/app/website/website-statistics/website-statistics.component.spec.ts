import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteStatisticsComponent } from './website-statistics.component';

describe('WebsiteStatisticsComponent', () => {
  let component: WebsiteStatisticsComponent;
  let fixture: ComponentFixture<WebsiteStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
