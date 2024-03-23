import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowDetailsDialogComponent } from './row-details-dialog.component';

describe('RowDetailsDialogComponent', () => {
  let component: RowDetailsDialogComponent;
  let fixture: ComponentFixture<RowDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
