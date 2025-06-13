import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureRegisterComponent } from './pressure-register.component';

describe('PressureRegisterComponent', () => {
  let component: PressureRegisterComponent;
  let fixture: ComponentFixture<PressureRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressureRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressureRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
