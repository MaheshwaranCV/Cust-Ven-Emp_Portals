import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderDataComponent } from './sale-order-data.component';

describe('SaleOrderDataComponent', () => {
  let component: SaleOrderDataComponent;
  let fixture: ComponentFixture<SaleOrderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleOrderDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
