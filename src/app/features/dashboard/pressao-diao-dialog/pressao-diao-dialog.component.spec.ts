import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressaoDialogComponent } from './pressao-diao-dialog.component';

describe('PressaoDiaoDialogComponent', () => {
  let component: PressaoDialogComponent;
  let fixture: ComponentFixture<PressaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressaoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
