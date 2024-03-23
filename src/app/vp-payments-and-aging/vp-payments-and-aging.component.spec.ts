import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPPaymentsAndAgingComponent } from './vp-payments-and-aging.component';

describe('VPPaymentsAndAgingComponent', () => {
  let component: VPPaymentsAndAgingComponent;
  let fixture: ComponentFixture<VPPaymentsAndAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VPPaymentsAndAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VPPaymentsAndAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
