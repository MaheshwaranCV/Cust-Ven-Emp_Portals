import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpCreditDebitMemoComponent } from './vp-credit-debit-memo.component';

describe('VpCreditDebitMemoComponent', () => {
  let component: VpCreditDebitMemoComponent;
  let fixture: ComponentFixture<VpCreditDebitMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpCreditDebitMemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpCreditDebitMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
