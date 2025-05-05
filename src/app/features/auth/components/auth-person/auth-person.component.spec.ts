import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPersonComponent } from './auth-person.component';

describe('AuthPersonComponent', () => {
  let component: AuthPersonComponent;
  let fixture: ComponentFixture<AuthPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
