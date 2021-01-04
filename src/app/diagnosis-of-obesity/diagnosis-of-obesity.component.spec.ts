import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisOfObesityComponent } from './diagnosis-of-obesity.component';

describe('DiagnosisOfObesityComponent', () => {
  let component: DiagnosisOfObesityComponent;
  let fixture: ComponentFixture<DiagnosisOfObesityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisOfObesityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisOfObesityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
