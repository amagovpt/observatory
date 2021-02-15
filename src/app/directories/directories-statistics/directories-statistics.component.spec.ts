import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DirectoriesStatisticsComponent } from "./directories-statistics.component";

describe("DirectoriesStatisticsComponent", () => {
  let component: DirectoriesStatisticsComponent;
  let fixture: ComponentFixture<DirectoriesStatisticsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DirectoriesStatisticsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoriesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
