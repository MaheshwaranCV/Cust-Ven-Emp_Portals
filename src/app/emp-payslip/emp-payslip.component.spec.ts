import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPayslipComponent } from './emp-payslip.component';

describe('EmpPayslipComponent', () => {
  let component: EmpPayslipComponent;
  let fixture: ComponentFixture<EmpPayslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPayslipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
