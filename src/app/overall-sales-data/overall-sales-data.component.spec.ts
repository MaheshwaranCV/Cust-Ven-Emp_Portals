import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSalesDataComponent } from './overall-sales-data.component';

describe('OverallSalesDataComponent', () => {
  let component: OverallSalesDataComponent;
  let fixture: ComponentFixture<OverallSalesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallSalesDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallSalesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
