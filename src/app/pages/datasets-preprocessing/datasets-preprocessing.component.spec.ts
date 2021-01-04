import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsPreprocessingComponent } from './datasets-preprocessing.component';

describe('DatasetsPreprocessingComponent', () => {
  let component: DatasetsPreprocessingComponent;
  let fixture: ComponentFixture<DatasetsPreprocessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetsPreprocessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsPreprocessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
