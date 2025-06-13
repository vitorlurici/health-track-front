import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlucoseRegisterComponent } from './glucose-register.component';

describe('GlucoseRegisterComponent', () => {
  let component: GlucoseRegisterComponent;
  let fixture: ComponentFixture<GlucoseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlucoseRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlucoseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
