import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementCorrectionDistributionDialogComponent } from './element-correction-distribution-dialog.component';

describe('ElementCorrectionDistributionDialogComponent', () => {
  let component: ElementCorrectionDistributionDialogComponent;
  let fixture: ComponentFixture<ElementCorrectionDistributionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementCorrectionDistributionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementCorrectionDistributionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
