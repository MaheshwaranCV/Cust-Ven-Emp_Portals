import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDataComponent } from './inquiry-data.component';

describe('InquiryDataComponent', () => {
  let component: InquiryDataComponent;
  let fixture: ComponentFixture<InquiryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
