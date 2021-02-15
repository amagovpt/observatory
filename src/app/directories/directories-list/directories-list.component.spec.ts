import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DirectoriesListComponent } from "./directories-list.component";

describe("DirectoriesListComponent", () => {
  let component: DirectoriesListComponent;
  let fixture: ComponentFixture<DirectoriesListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DirectoriesListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
