import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterButtonSwapComponent } from './login-register-button-swap.component';

describe('LoginRegisterButtonSwapComponent', () => {
  let component: LoginRegisterButtonSwapComponent;
  let fixture: ComponentFixture<LoginRegisterButtonSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterButtonSwapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterButtonSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
