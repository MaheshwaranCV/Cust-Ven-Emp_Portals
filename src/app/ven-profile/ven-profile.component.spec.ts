import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenProfileComponent } from './ven-profile.component';

describe('VenProfileComponent', () => {
  let component: VenProfileComponent;
  let fixture: ComponentFixture<VenProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
