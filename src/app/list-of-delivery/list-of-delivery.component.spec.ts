import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDeliveryComponent } from './list-of-delivery.component';

describe('ListOfDeliveryComponent', () => {
  let component: ListOfDeliveryComponent;
  let fixture: ComponentFixture<ListOfDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
