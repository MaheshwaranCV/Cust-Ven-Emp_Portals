import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsAndAgingComponent } from './payments-and-aging.component';

describe('PaymentsAndAgingComponent', () => {
  let component: PaymentsAndAgingComponent;
  let fixture: ComponentFixture<PaymentsAndAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsAndAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsAndAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
