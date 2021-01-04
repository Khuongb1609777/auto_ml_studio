import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisObesityComponent } from './diagnosis-obesity.component';

describe('DiagnosisObesityComponent', () => {
  let component: DiagnosisObesityComponent;
  let fixture: ComponentFixture<DiagnosisObesityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisObesityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisObesityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
