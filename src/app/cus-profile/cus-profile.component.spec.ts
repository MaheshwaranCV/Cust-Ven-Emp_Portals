import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusProfileComponent } from './cus-profile.component';

describe('CusProfileComponent', () => {
  let component: CusProfileComponent;
  let fixture: ComponentFixture<CusProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
