import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetObesityComponent } from './dataset-obesity.component';

describe('DatasetObesityComponent', () => {
  let component: DatasetObesityComponent;
  let fixture: ComponentFixture<DatasetObesityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetObesityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetObesityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
