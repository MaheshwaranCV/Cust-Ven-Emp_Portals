import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenDashboardComponent } from './ven-dashboard.component';

describe('VenDashboardComponent', () => {
  let component: VenDashboardComponent;
  let fixture: ComponentFixture<VenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
