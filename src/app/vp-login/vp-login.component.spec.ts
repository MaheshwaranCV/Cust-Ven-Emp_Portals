import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPLoginComponent } from './vp-login.component';

describe('VPLoginComponent', () => {
  let component: VPLoginComponent;
  let fixture: ComponentFixture<VPLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VPLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VPLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
