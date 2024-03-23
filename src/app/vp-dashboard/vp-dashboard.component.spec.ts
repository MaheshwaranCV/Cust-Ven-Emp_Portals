import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPDashboardComponent } from './vp-dashboard.component';

describe('VPDashboardComponent', () => {
  let component: VPDashboardComponent;
  let fixture: ComponentFixture<VPDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VPDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VPDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
