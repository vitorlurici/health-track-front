import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordDialogComponent } from './edit-record-dialog.component';

describe('EditRecordDialogComponent', () => {
  let component: EditRecordDialogComponent;
  let fixture: ComponentFixture<EditRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecordDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
