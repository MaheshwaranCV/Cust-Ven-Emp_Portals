import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpGoodsReceiptComponent } from './vp-goods-receipt.component';

describe('VpGoodsReceiptComponent', () => {
  let component: VpGoodsReceiptComponent;
  let fixture: ComponentFixture<VpGoodsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpGoodsReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpGoodsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
