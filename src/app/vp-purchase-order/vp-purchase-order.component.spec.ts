import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpPurchaseOrderComponent } from './vp-purchase-order.component';

describe('VpPurchaseOrderComponent', () => {
  let component: VpPurchaseOrderComponent;
  let fixture: ComponentFixture<VpPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpPurchaseOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
