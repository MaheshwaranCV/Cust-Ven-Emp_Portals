import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDebitMemoComponent } from './credit-debit-memo.component';

describe('CreditDebitMemoComponent', () => {
  let component: CreditDebitMemoComponent;
  let fixture: ComponentFixture<CreditDebitMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditDebitMemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditDebitMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
