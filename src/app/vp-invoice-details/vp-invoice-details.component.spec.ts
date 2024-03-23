import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPInvoiceDetailsComponent } from './vp-invoice-details.component';

describe('VPInvoiceDetailsComponent', () => {
  let component: VPInvoiceDetailsComponent;
  let fixture: ComponentFixture<VPInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VPInvoiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VPInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
