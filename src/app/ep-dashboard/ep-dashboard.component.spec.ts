import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpDashboardComponent } from './ep-dashboard.component';

describe('EpDashboardComponent', () => {
  let component: EpDashboardComponent;
  let fixture: ComponentFixture<EpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
