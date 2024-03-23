import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenFinDetailsComponent } from './ven-fin-details.component';

describe('VenFinDetailsComponent', () => {
  let component: VenFinDetailsComponent;
  let fixture: ComponentFixture<VenFinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenFinDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenFinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
