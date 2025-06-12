import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRegistrationComponent } from './daily-registration.component';

describe('DailyRegistrationComponent', () => {
  let component: DailyRegistrationComponent;
  let fixture: ComponentFixture<DailyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
