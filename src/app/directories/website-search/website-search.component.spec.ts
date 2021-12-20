import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSearchComponent } from './website-search.component';

describe('WebsiteSearchComponent', () => {
  let component: WebsiteSearchComponent;
  let fixture: ComponentFixture<WebsiteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
