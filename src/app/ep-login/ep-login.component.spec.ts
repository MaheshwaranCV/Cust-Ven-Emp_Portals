import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpLoginComponent } from './ep-login.component';

describe('EpLoginComponent', () => {
  let component: EpLoginComponent;
  let fixture: ComponentFixture<EpLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
