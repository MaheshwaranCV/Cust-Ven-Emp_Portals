import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpReqQuotationComponent } from './vp-req-quotation.component';

describe('VpReqQuotationComponent', () => {
  let component: VpReqQuotationComponent;
  let fixture: ComponentFixture<VpReqQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpReqQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpReqQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
