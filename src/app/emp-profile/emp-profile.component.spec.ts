import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProfileComponent } from './emp-profile.component';

describe('EmpProfileComponent', () => {
  let component: EmpProfileComponent;
  let fixture: ComponentFixture<EmpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
