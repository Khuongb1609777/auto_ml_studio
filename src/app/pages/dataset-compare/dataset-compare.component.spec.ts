import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetCompareComponent } from './dataset-compare.component';

describe('DatasetCompareComponent', () => {
  let component: DatasetCompareComponent;
  let fixture: ComponentFixture<DatasetCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
