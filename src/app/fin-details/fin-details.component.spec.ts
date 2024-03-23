import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinDetailsComponent } from './fin-details.component';

describe('FinDetailsComponent', () => {
  let component: FinDetailsComponent;
  let fixture: ComponentFixture<FinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
