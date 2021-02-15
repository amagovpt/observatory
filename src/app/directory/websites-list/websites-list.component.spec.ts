import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsitesListComponent } from './websites-list.component';

describe('WebsitesListComponent', () => {
  let component: WebsitesListComponent;
  let fixture: ComponentFixture<WebsitesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
